function cargarInfoLS() {
  return JSON.parse(localStorage.getItem("info")) || [];
}

