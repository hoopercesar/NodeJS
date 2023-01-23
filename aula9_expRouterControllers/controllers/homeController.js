exports.paginaInicial = (req, res) => {
  res.send(
    `<form action='/' method='POST'> Nome del Cliente: <input type='text' name='nome'><br> apellido: <input type='text' name='apellido'> <button>send Formulario</button> </form>`
  );
};

exports.trataPost = (req, res) => {
  res.send("Nueva ruta de post");
};
