const path = require("path");
const caminoArchivo = path.resolve(__dirname, "test.json");

// importamos la función de lectura desde el read.js
const leer = require("./modulos/read");

async function leerArchivos(ruta) {
  const datos = await leer(ruta);
  renderDatos(datos);
}

function renderDatos(datos) {
  datos = JSON.parse(datos);

  datos.forEach((dato) => {
    console.log(dato.apellido);
  });
}

leerArchivos(caminoArchivo);
