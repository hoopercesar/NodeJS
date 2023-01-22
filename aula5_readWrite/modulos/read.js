const fs = require("fs").promises;

// vamos a exportar la función que lee el archivo json
module.exports = (ruta) => fs.readFile(ruta, "utf8");
