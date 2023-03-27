//Declaro constantes y acceso al DOM dek simulador.
const iva = 0.21;
const iMonto = document.getElementById("monto");
let simulacion = document.getElementById("formsimulador");
const info = document.getElementById("infoPrestamo");
const result = document.getElementById("resultado");

//Armo una funcion constructora para los plazos y tasas.
//Cuando hay nuevas combinacionesd de cuotas y tasas de interes solo hay que mantener esta parte del codigo porque despues se cargan con la funcion "cargarCondiciones()"
class Condicion {
  constructor(plazo, tna) {
    this.plazo = plazo;
    this.tna = tna;
  }
}
const condiciones = [];
condiciones.push(new Condicion(12, 99.5));
condiciones.push(new Condicion(18, 99.5));
condiciones.push(new Condicion(24, 99.5));
condiciones.push(new Condicion(36, 106.5));
condiciones.push(new Condicion(48, 106.5));
condiciones.push(new Condicion(60, 106.5));
condiciones.push(new Condicion(72, 106.5));
condiciones.push(new Condicion(84, 106.5));
condiciones.push(new Condicion(96, 106.5));

//cargo las condiciones en el SELECT #selectCond del HTML
function cargarCondiciones() {
  const select = document.getElementById("selectCond");
  let options = "";
  for (let i = 0; i < condiciones.length; i++) {
    const condicion = condiciones[i];
    options += `<option value="${i}">${condicion.plazo} meses - TNA: ${condicion.tna}%</option>`;
  }
  select.innerHTML = options;
}

cargarCondiciones();

//------------------------------------------------------------------------
//valida y corre simulacion
simulacion.addEventListener("submit", validaSimulacion);

function validaSimulacion(event) {
  event.preventDefault();
  monto = parseInt(iMonto.value);
  plazo = parseInt(condiciones[selectCond.value].plazo);
  tna = parseFloat(condiciones[selectCond.value].tna);

  //Invoco la funcion principal calcularPagos
  calcularPagos(monto, plazo, tna);
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
  mostrarInfoPrestamo();
  mostrarResultados();
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
//funcion para mostar Informacion del Prestamo
const mostrarInfoPrestamo = () => {
  info,innerHTML = "";
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
              <td class="border-bottom text-center"><strong>$${monto}</strong></td>
              <td class="border-bottom text-center"><strong>${plazo} Cuotas</strong></td>
              <td class="border-bottom text-center"><strong>${tna} %</strong></td>
              <td class="border-bottom text-center"><strong>${tea.toFixed(2)} %</strong></td>
              <td class="border-bottom text-center"><strong>${tem.toFixed(5)} %</strong></td>
          </tr>
      </tbody>
  </table>
  `;
  info.innerHTML = tablaInfo
};
//----------------------------------------------------------------------------------
//funcion para mostar resultados
const mostrarResultados = () => {
  result.innerHTML = "";
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

  result.innerHTML = tabla;
};
