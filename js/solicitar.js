const info = cargarInfoLS();
let cardInfo = document.getElementById("credSelect");
let inputInfoOculta = document.getElementById("infoOculta");

function credSelect() {
  /* const info = cargarInfoLS(); */
  if (info == "") {
    salida = `<p class="text-danger">Crédito sin simular</p>`;
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
                            <span class="text-body-secondary ">${info.tem.toFixed(
                              2
                            )} %</span>
                          </li>
                        </ul> `;
  }
  cardInfo.innerHTML = salida;
}


//Boton Borrar
function borrarSolicitar() {
  localStorage.removeItem("pagos");
  localStorage.removeItem("info");
  cardInfo.innerHTML="Crédito sin simular";
  inputInfoOculta.value="Crédito sin simular";
}


// Validador de formulario de Bootstrap
( () => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', async event => {//uso async-await
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }else {       
        await alertaEnvio(event) //uso await para esperar el cierre de la Alerta de Envio
        await form.submit()
      }
      form.classList.add('was-validated')
      
    }, false)
  })
})()


async function alertaEnvio(event) {
  event.preventDefault();
  Swal.fire({
    timer:5000,
    icon: "success",
    title: "Tu solicitud ha sido enviada",
    text: "Pronto nos contactaremos, muchas gracias!",
    footer: '<a href="../index.html">Volver a Simular</a>',
  });
}


function infoOculta() {
  inputInfoOculta.value =  `monto: ${info.monto}, plazo: ${info.plazo}, tna: ${info.tna}, tea: ${info.tea.toFixed(2)}, tem: ${info.tem.toFixed(2)}`;
}


credSelect();
info != ""  && infoOculta(); //solo envia por Metodo POST la informacion si existe la simulacion