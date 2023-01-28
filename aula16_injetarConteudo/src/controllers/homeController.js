const HomeModel = require("../models/HomeModel");

HomeModel.find()
  .then((datos) => {
    datos.forEach((dato) => console.log(dato.titulo));
  })
  .catch((err) => console.log(err));

exports.paginaInicial = (req, res) => {
  res.render("index", {
    titulo: "este es el titulo",
    numeros: [1, 2, 3, 4, 5, 6, 7, 8],
    modelo: HomeModel.find()
      .then((datos) => datos)
      .catch((err) => console.log(err)),
  });
  return;
};

exports.trataPost = (req, res) => {
  res.send(`este es el cliente ${req.body.cliente}`);
  return;
};
