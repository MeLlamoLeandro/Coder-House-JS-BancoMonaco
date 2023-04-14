//Declaro variables-constantes globales.
const iva = 0.21;
let monto;
let plazo;
let tna;
//Acceso al DOM del simulador
let simulacionDom = document.getElementById("formsimulador");
const inputMontoDom = document.getElementById("monto");
const selectDom = document.getElementById("selectCond");
const buscarDom = document.getElementById("opcionesBuscar");
const infoDom = document.getElementById("infoPrestamo");
const resultDom = document.getElementById("resultado");
const volverArribaBtn = document.querySelector(".scroll-up-btn");

//Inicia Simulacion -------------------------------------------------------------------------------------------
simulacionDom.addEventListener("submit", iniciaSimulacion);
function iniciaSimulacion(event) {
  event.preventDefault();

  monto = parseInt(inputMontoDom.value);
  plazo = parseInt(condiciones[selectDom.value].plazo);
  tna = parseFloat(condiciones[selectDom.value].tna);

  //Invoco la funcion principal calcularPagos
  calcularPagos(monto, plazo, tna);

  // Invoco funciones auxiliares
  guardaInfoLS();
  guardaSimulacionLS(pagos);

  const info = cargarInfoLS();
  habilitarFxBusqueda();
  mostrarInfoPrestamo(info);
  mostrarResultados(pagos);
  document.getElementById("continua").innerHTML = "";
  scroll();
}

//Funcion para Calcular Pagos
const calcularPagos = (monto, plazo, tna) => {
  pagos = [];
  const tMensual = tna / 100 / 12;
  const cuotaPura =
    (monto * (tMensual * Math.pow(1 + tMensual, plazo))) /
    (Math.pow(1 + tMensual, plazo) - 1);

  // Calculo los pagos mensuales desde el mes 1 al seleccionado con un bucle.
  for (let i = 1; i <= plazo; i++) {
    if (i === 1) {
      saldoDeuda = monto;
    } else {
      saldoDeuda = saldoDeuda - capital;
    }

    // Obtener la fecha de pago en formato "dd-mm-yyyy" usando LUXON
    const fecha = DateTime.local().plus({ months: i });
    const fechaCuota = fecha.toFormat("dd-MM-yyyy");

    // Invoco funciones de calulos auxiliares
    calculaInteres(saldoDeuda, tMensual);
    calculaCapital(cuotaPura, interes);
    calculaIva(iva, interes);
    calculaCuotaTotal(capital, interes, pagoIva);

    // Almaceno los valores en el array "pagos", redondeando los resultados a dos decimales
    pagos.push({
      cuotaN: i,
      vtoCuota: fechaCuota,
      saldoDeuda: saldoDeuda.toFixed(2),
      cuotaPura: cuotaPura.toFixed(2),
      capital: capital.toFixed(2),
      intereses: interes.toFixed(2),
      iva: pagoIva.toFixed(2),
      cuotaTotal: cuotaTotal.toFixed(2),
    });
  }

  calculaTem();
  calculaTea();
};

//----------------------------------------------------------------
//Declaro funciones de Cálculos Auxiliares
const calculaInteres = (saldoDeuda, tMensual) => {
  interes = saldoDeuda * tMensual;
};

const calculaCapital = (cuotaPura, interes) => {
  capital = cuotaPura - interes;
};

const calculaIva = (iva, interes) => {
  pagoIva = iva * interes;
};

const calculaCuotaTotal = (capital, interes, pagoIva) => {
  cuotaTotal = capital + interes + pagoIva;
};

const calculaTem = () => {
  tem = tna / 12;
};

const calculaTea = () => {
  tea = (Math.pow(1 + tem / 100, 12) - 1) * 100;
};

//Funciones auxiliares a la simulacion
//--------------------------------------------------------------------------

//Funciones para administrar el LocalStorage
const guardaInfoLS = () => {
  const info = {
    monto: monto,
    plazo: plazo,
    tna: tna,
    tea: tea,
    tem: tem,
  };
  localStorage.setItem("info", JSON.stringify(info));
};

//guarda simulacion en LS
const guardaSimulacionLS = (pagos) => {
  localStorage.setItem("pagos", JSON.stringify(pagos));
};

//Muestrar la Informacion del Prestamo
const mostrarInfoPrestamo = (info) => {
  infoDom.innerHTML = "";
  let tablaInfo = `
  <table class="table-responsive background-none m-1 p-1">
      <tbody>
          <tr>
              <td colspan="5" class="border-bottom p-2 fs-4"><strong>Información del Préstamo</strong></td>
          </tr>
          <tr>
              <td  class="p-2">Monto del Préstamo</td>
              <td  class="p-2">Plazo</td>
              <td  class="p-2">Tasa Nominal Anual</td>
              <td class="p-2">Tasa Efectiva Anual</td>
              <td class="p-2">Tasa Efectiva Mensual</td>
          </tr>
          <tr>
              <td class="border-bottom text-center"><strong>$${separadorMiles(
                info.monto
              )}</strong></td>
              <td class="border-bottom text-center"><strong>${
                info.plazo
              } Cuotas</strong></td>
              <td class="border-bottom text-center"><strong>${
                info.tna
              } %</strong></td>
              <td class="border-bottom text-center"><strong>${info.tea.toFixed(
                2
              )} %</strong></td>
              <td class="border-bottom text-center"><strong>${info.tem.toFixed(
                5
              )} %</strong></td>
          </tr>
      </tbody>
  </table>
  `;
  infoDom.innerHTML = tablaInfo;
};
//----------------------------------------------------------------------------------
//Mostrar los resultados de la simulacion en una tabla
const mostrarResultados = (pagos) => {
  resultDom.innerHTML = "";
  let tabla = `<h2>Resultados de la Simulación</h2>
    <div class="table-responsive">
        <table class="table table-striped table-sm text-center">
            <thead>
                <tr>
                    <th scope="col">Cuota N°</th>
                    <th scope="col">Vencimiento</th>
                    <th scope="col">Saldo Deuda</th>
                    <th scope="col">Cuota Pura</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Intereses</th>
                    <th scope="col">IVA</th>
                    <th scope="col">Cuota Total</th>
                </tr>
            </thead>
            <tbody>`;

  for (var i = 0; i < pagos.length; i++) {
    tabla += `<tr>
                            <td>${pagos[i].cuotaN}</td>
                            <td>${pagos[i].vtoCuota}</td>
                            <td>$${separadorMiles(pagos[i].saldoDeuda)}</td>
                            <td>$${separadorMiles(pagos[i].cuotaPura)}</td>
                            <td>$${separadorMiles(pagos[i].capital)}</td>
                            <td>$${separadorMiles(pagos[i].intereses)}</td>
                            <td>$${separadorMiles(pagos[i].iva)}</td>
                            <td>$${separadorMiles(pagos[i].cuotaTotal)}</td>
                        </tr>`;
  }

  tabla += `</tbody></table></div>
  <a href="./pages/solicitar.html" class="btn btn-success fw-bold">Solicitar</a>
  <button type="button" class="btn btn-dark fw-bold" onclick="borrarTodo()">Volver a Simular</button>`;

  resultDom.innerHTML = tabla;
};

// Habilitar funciones de busqueda
const habilitarFxBusqueda = () => {
  buscarDom.innerHTML = `
  <div class="m-4">
      <div id="stopScroll">
          <label class="fw-bold">Buscar pagos ingresando un N° de Cuota:
              <input type="number" class="form-control" id="bCuota" placeholder="Cuota N°">
          </label>
          <button id="btnBcuota" class="btn text-bg-dark fw-bold">Buscar</button>
          <button id="btnBorraBcuota" type="button" class="btn btn-danger">Borrar</button>
      </div>
      <div id="divBusquedaCuota"></div>
  </div>
  <div class="form-group m-4">
      <div>
          <label class="fw-bold">Buscar pagos por Vencimiento:
              <input type="date" class="form-control" id="fechaInput">
          </label>
          <button id="btnBfecha" class="btn text-bg-dark fw-bold">Buscar</button>
          <button id="btnBorraBfecha" type="button" class="btn btn-danger">Borrar</button>
      </div>
      <div id="divBusquedaFecha"></div>
  </div>
  `;

  //creo funciones de busqueda para los elementos recien creados
  //FX al hacer click en buscar Nro de cuota
  let bCuota = document.getElementById("bCuota");
  let btnBcuota = document.getElementById("btnBcuota");

  btnBcuota.onclick = () => {
    buscarCuota(bCuota.value - 1);
  };

  //FX al hacer click en buscar por fecha de vencimiento
  let fechaInput = document.getElementById("fechaInput");
  let btnBfecha = document.getElementById("btnBfecha");

  btnBfecha.onclick = () => {
    let fechaLuxon = DateTime.fromISO(fechaInput.value);
    let bFecha = fechaLuxon.toFormat("dd-MM-yyyy");

    const pagos = cargarSimulacionLS();
    //averiguo si existe la fecha en el array "pagos" con METODO SOME
    const existeFecha = pagos.some((pagos) => pagos.vtoCuota === bFecha);
    if (existeFecha == true) {
      buscarFecha(bFecha);
    } else {
      Swal.fire("La fecha de vencimiento no existe!");
    }
  };

  //Borrar busqueda por Cuota
  document.getElementById("btnBorraBcuota").addEventListener("click", () => {
    const salida = document.getElementById("divBusquedaCuota");
    salida.innerHTML = "";
  });
  //Borrar busqueda por Fecha
  document.getElementById("btnBorraBfecha").addEventListener("click", () => {
    const salida = document.getElementById("divBusquedaFecha");
    salida.innerHTML = "";
  });
};

//------------------------------------------------------------------------
//FX busqueda por Nro de cuota.
const buscarCuota = (i) => {
  const pagos = cargarSimulacionLS();
  divBusquedaCuota.innerHTML = `
  <table class="table table-striped table-sm text-center">
    <thead>
        <tr>
            <th scope="col">Cuota N°</th>
            <th scope="col">Vencimiento</th>
            <th scope="col">Saldo Deuda</th>
            <th scope="col">Cuota Pura</th>
            <th scope="col">Capital</th>
            <th scope="col">Intereses</th>
            <th scope="col">IVA</th>
            <th scope="col">Cuota Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>${pagos[i].cuotaN}</td>
          <td>${pagos[i].vtoCuota}</td>
          <td>$${separadorMiles(pagos[i].saldoDeuda)}</td>
          <td>$${separadorMiles(pagos[i].cuotaPura)}</td>
          <td>$${separadorMiles(pagos[i].capital)}</td>
          <td>$${separadorMiles(pagos[i].intereses)}</td>
          <td>$${separadorMiles(pagos[i].iva)}</td>
          <td>$${separadorMiles(pagos[i].cuotaTotal)}</td>
        </tr>
    </tbody>
  </table>
  `;
};

//------------------------------------------------------------------------
//FX busqueda por fecha de vencimiento utilizando el METODO FILTER
const buscarFecha = (bFecha) => {
  const pagos = cargarSimulacionLS();
  const filtroFecha = pagos.filter((pagos) => pagos.vtoCuota == bFecha);
  divBusquedaFecha.innerHTML = `
  <table class="table table-striped table-sm text-center">
    <thead>
        <tr>
            <th scope="col">Cuota N°</th>
            <th scope="col">Vencimiento</th>
            <th scope="col">Saldo Deuda</th>
            <th scope="col">Cuota Pura</th>
            <th scope="col">Capital</th>
            <th scope="col">Intereses</th>
            <th scope="col">IVA</th>
            <th scope="col">Cuota Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>${filtroFecha[0].cuotaN}</td>
          <td>${filtroFecha[0].vtoCuota}</td>
          <td>$${separadorMiles(filtroFecha[0].saldoDeuda)}</td>
          <td>$${separadorMiles(filtroFecha[0].cuotaPura)}</td>
          <td>$${separadorMiles(filtroFecha[0].capital)}</td>
          <td>$${separadorMiles(filtroFecha[0].intereses)}</td>
          <td>$${separadorMiles(filtroFecha[0].iva)}</td>
          <td>$${separadorMiles(filtroFecha[0].cuotaTotal)}</td>
        </tr>
    </tbody>
  </table>
  `;
};

//------------------------------------------------------------------------
//Renders
const info = JSON.parse(localStorage.getItem("info")) || [];

function cargarInfoLS() {
  return JSON.parse(localStorage.getItem("info")) || [];
}

function renderResultados() {
  const info = cargarInfoLS();
  const pagos = cargarSimulacionLS();
  if (info.length != []) {
    let salida = `
    <div class="alert alert-success d-flex align-items-center justify-content-between" role="alert">
      <div>
        <p class="fs-2">Continua tu simulación desde donde la dejaste!</p>
      </div>
      <div>
        <button type="button" class="btn btn-danger" onclick="borrarTodo()">Borrar Todo</button>
      </div>
    </div>`;
    document.getElementById("continua").innerHTML = salida;
    if (pagos.length > 0) {
      mostrarResultados(pagos);
    }
    habilitarFxBusqueda();
    mostrarInfoPrestamo(info);
  }
}

function cargarSimulacionLS() {
  return JSON.parse(localStorage.getItem("pagos")) || [];
}

// renderSelect();
renderResultados();

//-----------------------------------------
//Borrar Todo
function borrarTodo() {
  localStorage.removeItem("pagos");
  localStorage.removeItem("info");
  infoDom.innerHTML = "";
  resultDom.innerHTML = "";
  buscarDom.innerHTML = "";
  document.getElementById("continua").innerHTML = "";
  scrollTop();
}

//---------------------------------------------
//scrolling
function scroll() {
  const a = document.getElementById("stopScroll");
  a.scrollIntoView({
    behavior: "smooth",
  });
}

function scrollTop() {
  const a = document.getElementById("top");
  a.scrollIntoView({
    behavior: "smooth",
  });
}

//----------------------------------

window.addEventListener("scroll", () => {
  /* if (window.scrollY > 200) {
    volverArribaBtn.style.display = 'block';
  } else {
    volverArribaBtn.style.display = 'none';
  } */
  if (window.scrollY > 200) {
    volverArribaBtn.classList.add("mostrar");
  } else {
    volverArribaBtn.classList.remove("mostrar");
  }
});

volverArribaBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//---------------------FX SEPARADOR DE MILES

// separador de miles en Pesos Argentinos
function separadorMiles(numero) {
  let partesNumero = numero.toString().split(".");

  partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return partesNumero.join(",");
}
