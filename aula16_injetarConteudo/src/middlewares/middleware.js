exports.middlewareGlobal = (req, res, next) => {
  res.locals.unaVariableLocal = "Este es el valor de la variable Local";
  next();
};
