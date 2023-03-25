const condiciones = [
  new Condicion(12, 96.5),
  new Condicion(18, 96.5),
  new Condicion(24, 96.5),
  new Condicion(36, 103),
  new Condicion(48, 103),
  new Condicion(60, 103),
  new Condicion(72, 103)
];

function cargarCondiciones() {
  const select = document.getElementById("selectCond");
  let options = "";

  for (let i = 0; i < condiciones.length; i++) {
    const condicion = condiciones[i];
    options += `<option value="${i}">${condicion.plazo} cuotas - TNA: ${condicion.tna}%</option>`;
  }

  select.innerHTML = options;
}

cargarCondiciones();