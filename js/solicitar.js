const info = cargarInfoLS();
let cardInfo = document.getElementById("credSelect");

function credSelect() {
  const info = cargarInfoLS();
  if (info == "") {
    salida = "";
  } else {
    salida = `<ul class="list-group mb-3">
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Monto del Préstamo</h6>
                                <small class="text-body-secondary">Pesos</small>
                            </div>
                            <span class="text-body-secondary ">$${separadorMiles(
                              info.monto
                            )}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Plazo</h6>
                              <small class="text-body-secondary">Meses</small>
                            </div>
                            <span class="text-body-secondary ">${
                              info.plazo
                            }</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Tasa Nominal Anual</h6>
                            </div>
                            <span class="text-body-secondary ">${
                              info.tna
                            } %</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Tasa Efectiva Anual</h6>
                            </div>
                            <span class="text-body-secondary ">${info.tea.toFixed(
                              2
                            )} %</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                              <h6 class="my-0">Tasa Efectiva Mensual</h6>
                            </div>
                            <span class="text-body-secondary ">$${info.tem.toFixed(
                              2
                            )} %</span>
                          </li>
                        </ul> `;
  }
  cardInfo.innerHTML = salida;
}

//Card Credito Seleccionado

function solicitar() {
  Swal.fire({
    timer: 10000,
    icon: "success",
    title: "Tu solicitud ha sido enviada",
    text: "Pronto nos contactaremos, muchas gracias!",
    footer: '<a href="../index.html">Volver a Simular</a>',
  });
}
//Borrar
function borrarSolicitar() {
  localStorage.removeItem("pagos");
  localStorage.removeItem("info");
  document.getElementById("credSelect").innerHTML = `<p class="text-danger">Crédito sin simular</p>`;
}

credSelect();
