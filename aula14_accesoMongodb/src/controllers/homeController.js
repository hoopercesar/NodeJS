const HomeModel = require("../models/HomeModel");

// para subir datos
// HomeModel.create({
//   titulo: "Ulises",
//   descripcion: "Difícil de entender",
// })
//   .then((datos) => console.log(datos))
//   .catch((err) => console.error(err));

// para acceder a los datos
HomeModel.find()
  .then((datos) => {
    datos.forEach((dato) => console.log(dato._id));
  })
  .catch((err) => console.log(err));

exports.paginaInicial = (req, res) => {
  res.render("index");
};

exports.trataPost = (req, res) => {
  res.send(`este es el cliente ${req.body.cliente}`);
};
