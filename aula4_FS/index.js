const fs = require("fs").promises;
const path = require("path");

// devuelve los files según el camino que se indique revisar
// fs.readdir("..")
//   .then((resolve) => {
//     if (resolve.slice(-2, -1) === "js") {
//       console.log("javascript");
//     }
//   })
//   .catch((err) => console.log(err));

async function readdir(rootDir) {
  rootDir = rootDir || path.resolve(__dirname);
  const files = await fs.readdir(rootDir);
  walk(files, rootDir);
}

async function walk(files, rootDir) {
  for (let file of files) {
    const fileFullPath = path.resolve(rootDir, file);
    const stats = await fs.stat(fileFullPath);

    // ignora aquellos archivo dentro de node_module
    // la expresión regular /.nombre-archivo/g.test(camino) busca dentro del path
    // de cada archivo. Si dentro de ese path existe un trozo donde aparezca
    // nombre-arhivo, entonces, ignora ese camino (pues se le ordena continuar)
    if (/.node_modules/g.test(fileFullPath)) continue;

    if (stats.isDirectory()) {
      readdir(fileFullPath);
      continue;
    }

    // estas expresiones son similares. buscan los caminos donde hay una sec y la ignoran
    if (/.sec/g.test(fileFullPath)) continue;

    // pero este comando es ligeramente diferete. Busca los paths que terminan con css
    // Si la expresión (path) no termina con css se ignora. Se incluyen también las expresiones
    // que terminan con html
    //
    if (!/\.css$/g.test(fileFullPath) && !/\.html$/g.test(fileFullPath))
      continue;

    console.log(fileFullPath);
  }
}

readdir("c:/Users/Cesar Hooper/Desktop/JS/");
