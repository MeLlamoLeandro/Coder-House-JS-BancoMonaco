function cargarCondiciones() {
  const selectCond = document.getElementById("selectCond");
  for (const condicion of condiciones) {
    const option = document.createElement("option");
    option.value = `${condicion.plazo},${condicion.tna}`;
    option.text = `${condicion.plazo} meses al ${condicion.tna}% TNA`;
    selectCond.add(option);
  }
}