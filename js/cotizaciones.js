let dolarInfoDiv = document.getElementById("cotizaciones");
let dolarData = [];

// Función para obtener la información del dólar con una solicitud GET a la API de DolarSi
async function getDolarInfo() {
  const response = await fetch(
    "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
  );
  const data = await response.json();
//al amceno la data en un nuevo array con MAP y luego selecciono solamente los valores que me interesa mostrar
  const dolarData = data.map((element) => {
    return {
        nombre: element.casa.nombre,
        compra: element.casa.compra,
        venta: element.casa.venta,
        variacion: element.casa.variacion
    }
}) 

const ticker1 = dolarData.filter((element) => element.nombre == 'Dolar Oficial'||"Dolar Contado con Liqui" ||'Dolar turista'||'Argentina' );
dolarInfoDiv.innerHTML = `${dolarData.nombre}: Compra ${dolarData.compra} / Venta ${dolarData.venta} / Var. ${dolarData.variacion}`

console.log(dolarData);
console.log(ticker1);
const values = data.map(
  (dolar) =>
    `${dolar.casa.nombre}: Compra ${dolar.casa.compra} / Venta ${dolar.casa.venta} / Var. ${dolar.casa.variacion}`
)
.join(" ");
console.log(values);


 /*  for (let dolarinfo of data){
    console.log(dolarinfo);

  } */
  // console.log(data[0]);
}


getDolarInfo();

// Crear cadena de texto con los valores de los diferentes tipos de dólar separados por un espacio
/* const values = data.map(
      (dolar) =>
        `${dolar.casa.nombre}: Compra ${dolar.casa.compra} / Venta ${dolar.casa.venta} / Var. ${dolar.casa.variacion}`
    )
    .join(" "); */

/* // Inicializar la marquesina con los valores obtenidos
  const marquee = new Marquee(dolarInfoDiv, {
    duration: 15000, // Duración de la animación en milisegundos
    gap: 50, // Espacio entre cada repetición de la cadena
    direction: "right", // Dirección de la animación (derecha a izquierda)
    duplicated: true, // Repetir la cadena una vez que termina
    pauseOnHover: true, // Pausar la animación al pasar el cursor sobre ella
    startVisible: true, // Comenzar con la cadena visible
  });

  // Establecer la cadena de texto como contenido de la marquesina
  marquee.text = values; */
