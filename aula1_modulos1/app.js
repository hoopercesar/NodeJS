const mod1 = require("./mod1");
const mod3 = require("./mod3");
const axios = require("axios");

// mod1.funcion();
// const p1 = new mod3.ClassePessoa("333.222.111-23", 234, "RJ");

// "https://www.otaviomiranda.com.br/files/json/pessoas.json"

axios("https://www.otaviomiranda.com.br/files/json/pessoas.json")
  .then((resolve) => console.log(resolve))
  .catch((e) => console.log(e));
