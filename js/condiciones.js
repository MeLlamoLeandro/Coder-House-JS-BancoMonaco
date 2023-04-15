//defino como variable GLOBAL condiciones y la cargo con el array con una fx asincronica. usando Fetch sobre el archivo local JSON
let condiciones = [];

function cargarCondiciones() {
  fetch("./js/condiciones.json")
    .then((response) => response.json())
    .then((data) => {
      condiciones = data;
      renderSelect(data);
    })
    .catch((error) => console.error(error));
}

//cargo las CONDICIONES del JSON en el DOM label SELECT #selectCond del HTML
function renderSelect(x) {
  const opciones = x;
  const select = document.getElementById("selectCond");
  let salida = "";
  for (let i = 0; i < opciones.length; i++) {
    const opcion = opciones[i];
    salida += `<option value="${i}">${opcion.plazo} meses - TNA: ${opcion.tna}%</option>`;
  }
  select.innerHTML = salida;
}

cargarCondiciones();
