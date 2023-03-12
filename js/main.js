alert("Bienvenido a Banco La Tenaza!!!\n\nEste simulador le permitira caclular la serie de pagos a realizar\ncuando solicita un prestamos a  tasa fija con sistema de amortización francés.\n");

//Declaro constantes y variables GLOBALES del simulador.
const iva = 0.21;//impuesto valor agregado, se imputa sobre los intereses de cada cuota

//Utilizo una funcion constructora para predeterminar los plazos y tazas que efectua el banco sobre los créditos combinandola con un array que almacena los obketos.
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


//Inicio la variables pidiendo los datos por PROMPT.
//Solicito las condiciones para la simulación.
iCondiciones = prompt(`Por favor, seleccione las condiciones del crédito que desea simular:\n
1 --> Plazo ${condiciones[0].plazo} meses y T.N.A ${condiciones[0].tna}%.\n
2 --> Plazo ${condiciones[1].plazo} meses y T.N.A ${condiciones[1].tna}%.\n
3 --> Plazo ${condiciones[2].plazo} meses y T.N.A ${condiciones[2].tna}%.\n
4 --> Plazo ${condiciones[3].plazo} meses y T.N.A ${condiciones[3].tna}%.\n
5 --> Plazo ${condiciones[4].plazo} meses y T.N.A ${condiciones[4].tna}%.\n
6 --> Plazo ${condiciones[5].plazo} meses y T.N.A ${condiciones[5].tna}%.\n
7 --> Plazo ${condiciones[6].plazo} meses y T.N.A ${condiciones[6].tna}%.`);

//Controlo los datos ingresados. Validar si estan dentro de los parametros del simulador.


let monto = parseInt(prompt("Por favor ingrese el monto a solicitar."));
while (monto <= 0) {
    monto = parseInt(prompt("Por favor ingrese un monto mayor a 0 (cero)."));
}
/*
let plazo = parseInt(prompt("Por favor ingrese el plazo en meses.(12 min.-72 máx.)."));
while ((plazo < pmin) || (plazo > pmax)){ 
    plazo = parseInt(prompt("Por favor ingrese el plazo en meses.(12 min.-72 máx.)."));
}    

let tna = parseFloat(prompt("Por favor ingrese la Tasa Nominal Anual(T.N.A) en números. Ejemplo '96.5' --> 96.5% T.N.A"));
while (tna <= 0){   
    tna = parseFloat(prompt("Por favor ingrese una T.N.A mayor a 0 (cero)."));
}

console.log('Simulando una serie de pagos para un crédito por: $'+ monto);
console.log("a devolver en un período de " + plazo + " meses");
console.log("con una tasa del " + tna + " %.");
console.log("------------------------------------------");
// Creo un Array para almacenar los pagos mensuales
const pagos = [];
//------------------------------------------------------------------------
//Declaro la funcion
const calcularPagos = (monto,plazo,tna)=>{
    //Calculo la tasa mensual - declaro e inicio la constante de tasa mensual
    const tMensual = tna /100 /12;
    //Calculo la cuota pura a descomponer entre capital/interes con la constante cuotaPura
    const cuotaPura = monto * (tMensual * Math.pow(1 + tMensual, plazo)) / (Math.pow(1 + tMensual, plazo) - 1);
    //variables locales que uso en la funcion
    let saldoDeuda;
    let interes;
    let capital;
    let cuotaTotal;

    

    // Calculo los pagos mensuales desde el mes 1 al seleccionado con un bucle.
    for (let i = 1; i <= plazo; i++) {
        
        //segun investigue, para calcular la primera cuota, el Saldo de Deuda es el equivalente al Monto solicitado
        //como en el simulador del banco ICBC y del BNA online.
        if (i === 1) {
            saldoDeuda = monto;
        }else{
            saldoDeuda = saldoDeuda - capital;
        }
        
        //Calculo el resto de los componentes de la cuota
        interes = saldoDeuda * tMensual;
        capital = cuotaPura - interes;
        const pagoIva = iva * interes;
        cuotaTotal = capital + interes + pagoIva;
        
        // Almaceno los valores en array de pagos, redondeando los resultados a dos decimales
        pagos.push({
            mes: i,
            saldoDeuda: saldoDeuda.toFixed(2),
            cuotaPura: cuotaPura.toFixed(2),
            capital: capital.toFixed(2),
            intereses: interes.toFixed(2),
            iva: pagoIva.toFixed(2),
            cuotaTotal: cuotaTotal.toFixed(2)
        })
        
        // Muestro el resultado de cada cuota en consola redondeando a dos decimales
        
        console.log("Mes: " + pagos[i-1].mes);
        console.log("Saldo Deuda: $" + pagos[i-1].saldoDeuda);
        console.log("Cuota pura: $" + pagos[i-1].cuotaPura);
        console.log("Capital: $" + pagos[i-1].capital);
        console.log("Intereses: $" + pagos[i-1].intereses);
        console.log("IVA: $" + pagos[i-1].iva);
        console.log("Cuota Total: $" + pagos[i-1].cuotaTotal);
        console.log("------------------------------------------");
    }
}

//Invoco la funcion calcularPagos
calcularPagos(monto,plazo,tna);
console.log(pagos);

*/