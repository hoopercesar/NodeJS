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
    `<form action='/' method='POST'> Nome del Cliente: <input type='text' name='nome'> <button>send Formulario</button> </form>`
  );
});

app.post("/", (req, res) => {
  res.send("formulario recibido");
});

app.get("/contacto", (req, res) => {
  res.send("obrigado por la respuesta");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
  console.log("Server activo en la puerta 3000");
});

// nodemon permite actualizar en vivo los cambios que se realicen
// en el servidor
// procedimiento:
// instalar nodemon en las dependencias dev: npm install nodemon --save-dev
// ejecutar nodemon con el servidor deseado: npx nodemon server.js
// ejecutar(2) desde terminar VSC: npm start
// ejecutar(3) desde prompt windows: cd hasta el archivo (en este caso aula7_nodemon)
// y luego npm start
