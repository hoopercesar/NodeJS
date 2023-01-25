exports.paginaInicial = (req, res) => {
  res.render("index");
};

exports.trataPost = (req, res) => {
  res.send(`este es el cliente ${req.body.cliente}`);
};
