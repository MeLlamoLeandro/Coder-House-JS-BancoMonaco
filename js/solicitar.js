const info = cargarInfoLS();

function solicitar() {
  Swal.fire({
    timer: 10000,
    icon: "success",
    title: "Tu solicitud ha sido enviada",
    text: "Pronto nos contactaremos, muchas gracias!",
    footer: '<a href="../index.html">Volver a Simular</a>',
  });
}


function credSelect() {
  const info = cargarInfoLS();
  info.length = 0 ? console.log("No hay info") : console.log(info);
}


//Borrar Todo
function borrarSolicitar() {
  localStorage.removeItem("pagos");
  localStorage.removeItem("info");
  
  document.getElementById("credSelect").innerHTML = "";
  
}



credSelect();
