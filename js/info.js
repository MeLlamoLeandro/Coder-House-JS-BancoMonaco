function cargarInfoLS() {
  return JSON.parse(localStorage.getItem("info")) || [];
}

// Formato separador de miles en Pesos Argentinos
function separadorMiles(numero) {
  let partesNumero = numero.toString().split(".");
  partesNumero[0] = partesNumero[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return partesNumero.join(",");
}
