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
  // req para guardar inf de session
  // req.session.usuario = { nome: "pepe", idade: "33" };
  // console.log(req.session.usuario);

  // req para flash messages
  // req.flash("info", "hola mundo");
  // req.flash("error", "cliente sin acceso");
  // req.flash("succes", "conexión exitosa");

  console.log(req.flash("error"), req.flash("succes"));

  res.render("index");
  return;
};

exports.trataPost = (req, res) => {
  res.send(`este es el cliente ${req.body.cliente}`);
  return;
};
