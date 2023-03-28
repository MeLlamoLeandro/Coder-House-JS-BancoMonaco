function renderSelect() {
  const opciones = cargarCondicionesLS();
  const select = document.getElementById("selectCond");
  let salida = "";
  for (let i = 0; i < opciones.length; i++) {
    const opcion = opciones[i];
    salida += `<option value="${i}">${opcion.plazo} meses - TNA: ${opcion.tna}%</option>`;
  }
  select.innerHTML = salida;
}

renderSelect();

