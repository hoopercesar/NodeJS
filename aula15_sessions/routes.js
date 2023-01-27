const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const contatoController = require("./src/controllers/contatoController");

// ruta del home
route.get("/", homeController.paginaInicial);
route.post("/", homeController.trataPost);

// rutas de contacto
route.get("/contato", contatoController.paginaInicial);

module.exports = route;
