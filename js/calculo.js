//Declaro constantes y acceso al DOM del simulador.
const iva = 0.21;
const iMontoDom = document.getElementById("monto");
let simulacionDom = document.getElementById("formsimulador");
const buscarDom = document.getElementById("opcionesBuscar");
const infoDom = document.getElementById("infoPrestamo");
const resultDom = document.getElementById("resultado");

//------------------------------------------------------------------------
//Simulacion
simulacionDom.addEventListener("submit", iniciaSimulacion);
function iniciaSimulacion(event) {
  event.preventDefault();

  const optCond = cargarCondicionesLS();

  monto = parseInt(iMontoDom.value);
  plazo = parseInt(optCond[selectCond.value].plazo);
  tna = parseFloat(optCond[selectCond.value].tna);

  //Invoco la funcion principal calcularPagos
  calcularPagos(monto, plazo, tna);

  guardaInfoLS();
  guardaSimulacionLS(pagos);

  mostrarFxBusqueda();
  const info = cargarInfoLS();
  mostrarInfoPrestamo(info);
  mostrarResultados(pagos);
}

//Calculo la serie de pagos
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

    //inicializo la fecha con el mes actual en formato "mm-yyyy"
    const fecha = new Date();
    let mesN = "";
    fecha.setMonth(fecha.getMonth() + i);
    if (fecha.getMonth() + 1 < 10) {
      mesN = "0" + (fecha.getMonth() + 1);
    } else {
      mesN = fecha.getMonth() + 1;
    }
    const fechaCuota = `${mesN}-${fecha.getFullYear()}`;

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
//funciones de calculos auxiliares
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

//----------------------------------------------------------------------------------
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

function cargarInfoLS() {
  return JSON.parse(localStorage.getItem("info")) || [];
}

function renderInfo() {
  const info = cargarInfoLS();
  if (info.length > 0) {
    mostrarInfoPrestamo(info);
  }
}

//guarda simulacion en LS
const guardaSimulacionLS = (pagos) => {
  localStorage.setItem("pagos", JSON.stringify(pagos));
};

function cargarSimulacionLS() {
  return JSON.parse(localStorage.getItem("pagos")) || [];
}

function renderResultados() {
  const pagos = cargarSimulacionLS();
  if (pagos.length > 0) {
    mostrarResultados(pagos);
  }
}

//funcion para mostar Informacion del Prestamo
const mostrarInfoPrestamo = (info) => {
  infoDom.innerHTML = "";
  let tablaInfo = `
  <table class="background-none">
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
              <td class="border-bottom text-center"><strong>$${info.monto}</strong></td>
              <td class="border-bottom text-center"><strong>${info.plazo} Cuotas</strong></td>
              <td class="border-bottom text-center"><strong>${info.tna} %</strong></td>
              <td class="border-bottom text-center"><strong>${info.tea.toFixed(2)} %</strong></td>
              <td class="border-bottom text-center"><strong>${info.tem.toFixed(5)} %</strong></td>
          </tr>
      </tbody>
  </table>
  `;
  infoDom.innerHTML = tablaInfo;
};
//----------------------------------------------------------------------------------
//funcion para mostar resultados
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
                            <td>$${pagos[i].saldoDeuda}</td>
                            <td>$${pagos[i].cuotaPura}</td>
                            <td>$${pagos[i].capital}</td>
                            <td>$${pagos[i].intereses}</td>
                            <td>$${pagos[i].iva}</td>
                            <td>$${pagos[i].cuotaTotal}</td>
                        </tr>`;
  }

  tabla += `</tbody></table></div>`;

  resultDom.innerHTML = tabla;
};

// mostrar funciones de busqueda
const mostrarFxBusqueda = () => {
  buscarDom.innerHTML = `
  <div class="m-4">
      <div>
          <label>Buscar resultados ingresando un N° de Cuota:
              <input type="number" class="form-control" id="bCuota" placeholder="Cuota N°">
          </label>
          <button id="btnBcuota" class="btn text-bg-warning">Buscar</button>
      </div>
      <div id="divBusquedaCuota"></div>
  </div>
  <div class="form-group m-4">
      <div>
          <label >Buscar resultados por Vencimiento:
              <input type="text" class="form-control" id="bFecha" placeholder="mm-yyyy">
          </label>
          <button id="btnBfecha" class="btn text-bg-warning">Buscar</button>
      </div>
      <div id="divBusquedaFecha"></div>
  </div>
  `;

  //FX al hacer click en buscar Nro de cuota
  let bCuota = document.getElementById("bCuota");
  let divBusquedaCuota = document.getElementById("divBusquedaCuota");
  let btnBcuota = document.getElementById("btnBcuota");
  btnBcuota.onclick = () => {
    buscarCuota(bCuota.value - 1);
  };

  //FX al hacer click en buscar por fecha de vencimiento
  let bFecha = document.getElementById("bFecha");
  let divBusquedaFecha = document.getElementById("divBusquedaFecha");
  let btnBfecha = document.getElementById("btnBfecha");
  btnBfecha.onclick = () => {
    //averiguo si existe la fecha en el array "pagos" con METODO SOME
    const existeFecha = pagos.some((pagos) => pagos.vtoCuota === bFecha.value);
    if (existeFecha == true) {
      buscarFecha(bFecha.value);
    }
  };
};

//------------------------------------------------------------------------
//FX busqueda por Nro de cuota.
const buscarCuota = (i) => {
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
          <td>$${pagos[i].saldoDeuda}</td>
          <td>$${pagos[i].cuotaPura}</td>
          <td>$${pagos[i].capital}</td>
          <td>$${pagos[i].intereses}</td>
          <td>$${pagos[i].iva}</td>
          <td>$${pagos[i].cuotaTotal}</td>
        </tr>
    </tbody>
  </table>
  `;
};

//------------------------------------------------------------------------
//FX busqueda por fecha de vencimiento utilizando el METODO FILTER
const buscarFecha = () => {
  const filtroFecha = pagos.filter((pagos) => pagos.vtoCuota == bFecha.value);
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
          <td>$${filtroFecha[0].saldoDeuda}</td>
          <td>$${filtroFecha[0].cuotaPura}</td>
          <td>$${filtroFecha[0].capital}</td>
          <td>$${filtroFecha[0].intereses}</td>
          <td>$${filtroFecha[0].iva}</td>
          <td>$${filtroFecha[0].cuotaTotal}</td>
        </tr>
    </tbody>
  </table>
  `;
};
renderInfo();
renderResultados();