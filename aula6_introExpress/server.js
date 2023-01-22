const express = require("express");
const app = express();

// ESTAS SON LAS OPERACIONES BÁSICAS QUE SE PUEDEN HACER
// CON UN SERVIDOR. OPERACIONES CRUD
//        Crear    Leer  Actualizar    Borrar
// CRUD: CREATE   READ   UPDATE       DELETE
//        POST    GET     PUT         DELETE

// http://mipagina.com/ --> GET --> entrega la página /
// http://mipagina.com/sobre <- GET --> entrega la página /sobre
// http://mipagina.com/contacto <- GET --> entrega la página /contacto

app.get("/", (req, res) => {
  res.send(
    `<form action='/' method='POST'> Nome: <input type='text' name='nome'> <button>Enviar</button> </form>`
  );
});

app.post("/", (req, res) => {
  res.send("recibimos tu formulario");
});

app.get("/contacto", (req, res) => {
  res.send("obrigado por la respuesta");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
  console.log("Server activo en la puerta 3000");
});
