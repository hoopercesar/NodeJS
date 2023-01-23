const express = require("express");
const route = express.Router();
const homeController = require("./controllers/homeController");
const contatoController = require("./controllers/contatoController");

// ruta del home
route.get("/", homeController.paginaInicial);
route.post("/", homeController.trataPost);

// rutas de contacto
route.get("/contato", contatoController.paginaInicial);

module.exports = route;
