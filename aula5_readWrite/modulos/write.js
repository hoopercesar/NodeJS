const fs = require("fs").promises;
const path = require("path");
const caminoArchivo = path.resolve(__dirname, "..", "teste.txt");
const caminoArchivo2 = path.resolve(__dirname, "..", "test.json");

for (let k = 50; k < 56; k++) {
  fs.writeFile(caminoArchivo, `imagen_${k}.jpg\n`, { flag: "a" });
}

const personas = [];
for (let k = 1; k < 6; k++) {
  let persona = {
    nome: `nombre${k}`,
    apellido: `apellido${k}`,
  };
  personas.push(persona);
}

const json = JSON.stringify(personas, "", 1);
fs.writeFile(caminoArchivo2, json, { flag: "w" });
