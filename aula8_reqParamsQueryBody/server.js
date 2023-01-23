const express = require("express");
const app = express();

// cuando se llena el formulario se guarda la información en un objeto
// este comando permite que se guarde la información en el objeto
// la información que recibe el formulario se envía por Post
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send(
    `<form action='/' method='POST'> Nome del Cliente: <input type='text' name='nome'><br> apellido: <input type='text' name='apellido'> <button>send Formulario</button> </form>`
  );
});

// el signo ? indica que el parámetro es opcional
app.get("/tests/:idUsuarios?/:parametro?/", (req, res) => {
  res.send(req.params);

  // ésto es un ejemplo de query
  // http://localhost:3000/tests/?nome=pepe&id=123&idade=33
  console.log(req.query);
});

app.post("/", (req, res) => {
  console.log(req.body);

  res.send(`Datos recibidos: ${req.body.nome} y ${req.body.apellido}`);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
  console.log("Server activo en la puerta 3000");
});
