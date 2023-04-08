// cargo las condiciones desde el archivo condiciones.json usando el método Fech
const condiciones = [];
fetch("condiciones.json")
  .then((response) => response.json())
  .then((data) => {
    const condiciones = data.condiciones;
    guardarCondicionesLS(condiciones);
  })
  .catch((error) => console.error(error));

//almaceno las diferentes posibilidades de credito en el Local Storage
function guardarCondicionesLS(condiciones) {
  localStorage.setItem("condiciones", JSON.stringify(condiciones));
}

//cargo las condiciones desde el LS para cargar en el SELECT #selectCond del HTML
function cargarCondicionesLS() {
  return (optCond = JSON.parse(localStorage.getItem("condiciones")) || []);
}

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

//guardarCondicionesLS(condiciones);
renderSelect();
