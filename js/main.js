let inicio = confirm(
  "Bienvenido a Banco Mónaco!!!\n\nEste simulador le permitira calcular la serie de pagos a realizar\ncuando solicita un prestamo a tasa fija con sistema de amortización francés.\n\nPara continuar presione Aceptar.\nPara salir de la simulación  presione Cancelar."
);
// Inicio la simulacion si el usuario confirma al Aceptar, sino no ejecuta la simulacion
switch (inicio) {
  case true:
    //Declaro constantes y variables GLOBALES del simulador.
    const iva = 0.21; //impuesto valor agregado, se imputa sobre los intereses de cada cuota

    //Utilizo una funcion constructora para predeterminar los plazos y tazas que efectua el banco sobre los créditos combinandola con un array que almacena los objetos.
    class Condicion {
      constructor(plazo, tna) {
        this.plazo = plazo;
        this.tna = tna;
      }
    }
    //Declaro un array de Condiciones para almacenar los objetos.
    const condiciones = [];
    condiciones.push(new Condicion(12, 96.5));
    condiciones.push(new Condicion(18, 96.5));
    condiciones.push(new Condicion(24, 96.5));
    condiciones.push(new Condicion(36, 103));
    condiciones.push(new Condicion(48, 103));
    condiciones.push(new Condicion(60, 103));
    condiciones.push(new Condicion(72, 103));

    //Inicio la variables pidiendo los datos por PROMPT y controlo los datos ingresados. Valido si estan dentro de los parametros del simulador.

    //Solicito el monto sobre el que calculo el credito.
    let monto = parseInt(prompt("Por favor ingrese el monto a solicitar."));

    while (monto <= 0) {
      monto = parseInt(prompt("Por favor ingrese un monto mayor a 0 (cero)."));
    }

    //Solicito las condiciones de pago
    let iCondiciones = parseInt(
      prompt(`Por favor, seleccione las condiciones del crédito que desea simular:\n
        1 --> Plazo ${condiciones[0].plazo} meses y T.N.A ${condiciones[0].tna}%.\n
        2 --> Plazo ${condiciones[1].plazo} meses y T.N.A ${condiciones[1].tna}%.\n
        3 --> Plazo ${condiciones[2].plazo} meses y T.N.A ${condiciones[2].tna}%.\n
        4 --> Plazo ${condiciones[3].plazo} meses y T.N.A ${condiciones[3].tna}%.\n
        5 --> Plazo ${condiciones[4].plazo} meses y T.N.A ${condiciones[4].tna}%.\n
        6 --> Plazo ${condiciones[5].plazo} meses y T.N.A ${condiciones[5].tna}%.\n
        7 --> Plazo ${condiciones[6].plazo} meses y T.N.A ${condiciones[6].tna}%.`)
    );

    while (iCondiciones < 1 || iCondiciones > 7) {
      iCondiciones = parseInt(
        prompt("Por favor seleccione una opcion del 1 al 7")
      );
    }

    let n = iCondiciones - 1;

    alert(
      `Simulando una serie de pagos para un crédito por: $${monto}\na devolver en un período de ${condiciones[n].plazo} meses\ncon una tasa de ${condiciones[n].tna}%`
    );

    //------------------------------------------------------------------------
    // Creo un Array para almacenar los pagos mensuales
    const pagos = [];

    //Declaro la funcion principal del simulador.
    const calcularPagos = (monto, plazo, tna) => {
      //Calculo la tasa mensual - declaro e inicio la constante de tasa mensual
      const tMensual = tna / 100 / 12;
      //Calculo la cuota pura a descomponer entre capital/interes con la constante cuotaPura
      const cuotaPura =
        (monto * (tMensual * Math.pow(1 + tMensual, plazo))) /
        (Math.pow(1 + tMensual, plazo) - 1);

      // Calculo los pagos mensuales desde el mes 1 al seleccionado con un bucle.
      for (let i = 1; i <= plazo; i++) {
        // segun investigue, para calcular la primera cuota, el Saldo de Deuda es el equivalente al Monto solicitado
        // como en el simulador del banco ICBC y del BNA online.
        if (i === 1) {
          saldoDeuda = monto;
        } else {
          saldoDeuda = saldoDeuda - capital;
        }

        //inicializo la fecha con el mes actual.
        const fecha = new Date();
        // Sumo el número de meses al mes actual
        fecha.setMonth(fecha.getMonth() + i);
        // Guardo el mes y año en formato "mm-yyyy"
        let mesN = "";
        if (fecha.getMonth() + 1 < 10) {
          mesN = "0" + (fecha.getMonth() + 1);
        } else {
          mesN = fecha.getMonth();
        }
        //const fechaCuota = `${fecha.getMonth() + 1}-${fecha.getFullYear()}`;
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

        // Muestro el resultado de cada cuota en consola redondeando a dos decimales
        console.log("Cuota N°: " + pagos[i - 1].cuotaN);
        console.log("Vencimiento: " + pagos[i - 1].vtoCuota);
        console.log("Saldo Deuda: $" + pagos[i - 1].saldoDeuda);
        console.log("Cuota pura: $" + pagos[i - 1].cuotaPura);
        console.log("Capital: $" + pagos[i - 1].capital);
        console.log("Intereses: $" + pagos[i - 1].intereses);
        console.log("IVA: $" + pagos[i - 1].iva);
        console.log("Cuota Total: $" + pagos[i - 1].cuotaTotal);
        console.log("------------------------------------------");
      }
      alert(
        "La simulación ha terminado, se han calculado los pagos mensuales y el resultado se encuentra en la consola.\nPresione Ctrl + Shift + i para visualizar los resultados."
      );
    };
    //Declaro funciones de calculo de los componentes de la cuota.
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

    //------------------------------------------------------------------------
    //Invoco la funcion principal calcularPagos
    calcularPagos(monto, condiciones[n].plazo, condiciones[n].tna);

    //------------------------------------------------------------------------
    //propongo una nueva funcionalidad de busqueda. Por Nro de cuota.
    busquedaNro = prompt("Desea buscar el detalle por N° de cuota ? (S/N)");
    if (busquedaNro.toUpperCase() == "S") {
      let bCuota =
        parseInt(
          prompt("Por favor, ingrese N° de la cuota que desea buscar.")
        ) - 1;
      while (bCuota < 1 || bCuota > condiciones[n].plazo) {
        bCuota = parseInt(
          prompt(
            `Por favor ingrese N° de la cuota entre 1 y ${condiciones[n].plazo}`
          )
        );
      }
      //funcion para buscar el detalle de un mes por Nro de cuota.
      const buscarCuota = (x) => {
        console.log(pagos[x]);
        alert(
          `Cuota N°: ${pagos[x].cuotaN}\n
              Vencimiento: ${pagos[x].vtoCuota}\n
              Saldo Deuda: $${pagos[x].saldoDeuda}\n
              Cuota pura: $${pagos[x].cuotaPura}\n
              Capital: $${pagos[x].capital}\n
              Intereses: $${pagos[x].intereses}\n
              IVA: $${pagos[x].iva}\n
              Cuota Total: $${pagos[x].cuotaTotal}`
        );
      };
      //invoco la funcion Buscar Cuota
      buscarCuota(bCuota);
    }

    //------------------------------------------------------------------------
    //Propongo una nueva funcionalidad de busqueda.Por fecha de vencimiento.

    busquedaFecha = prompt(
      "Desea buscar un pago por Fecha de Vencimiento? (S/N)"
    );
    if (busquedaFecha.toUpperCase() == "S") {
      let bFecha = prompt(
        "Por favor, ingrese la Fecha de Vencimiento cuota que desea buscar(mm-yyyy)."
      );
      //averiguo si existe la fecha en el array "pagos" con METODO SOME
      const existeFecha = pagos.some((pagos) => pagos.vtoCuota === bFecha);
      if (existeFecha == true) {
        //funcion para buscar el detalle de un mes por Fecha de Vencimiento utilizando el METODO FILTER
        const buscarFecha = (bfecha) => {
          const filtroFecha = pagos.filter((pagos) => pagos.vtoCuota == bFecha);
          console.log(filtroFecha);
          alert(
            `Cuota N°: ${filtroFecha[0].cuotaN}\n
              Vencimiento: ${filtroFecha[0].vtoCuota}\n
              Saldo Deuda: $${filtroFecha[0].saldoDeuda}\n
              Cuota pura: $${filtroFecha[0].cuotaPura}\n
              Capital: $${filtroFecha[0].capital}\n
              Intereses: $${filtroFecha[0].intereses}\n
              IVA: $${filtroFecha[0].iva}\n
              Cuota Total: $${filtroFecha[0].cuotaTotal}`
          );
        };
        //si existe invoco la funcion de busqueda por fecha en arryay pagos
        buscarFecha();
      } else {
        alert("No existe la fecha de vencimiento en la simulación.");
      }
    } else {
      alert("Muchas gracias por usar el simulador. Vuelva pronto!");
    }
    break;
  //fin de la simulación
  default:
    alert("Para volver a iniciar la simulacion recargue la página.");
    break;
}
