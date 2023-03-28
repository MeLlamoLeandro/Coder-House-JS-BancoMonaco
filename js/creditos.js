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

//almaceno las diferenctes posibilidades de credito en el Local Storage
function guardarCondicionesLS(condiciones) {
  localStorage.setItem("condiciones", JSON.stringify(condiciones));
}

//cargo las condiciones en el SELECT #selectCond del HTML
function cargarCondicionesLS() {
  return (optCond = JSON.parse(localStorage.getItem("condiciones")) || []);
}

guardarCondicionesLS(condiciones);
