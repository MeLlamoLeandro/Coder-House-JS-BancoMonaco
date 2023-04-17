//------------------------------------------------------------------------
//Renders

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

cargarInfoLS();
renderResultados();