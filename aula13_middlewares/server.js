const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const middlewares = require("./src/middlewares/middleware");

app.use(
  express.urlencoded({
    extended: true,
  })
);

// mongodb
// wHEgAoH7VBK8e06e: senha usuario: cesarhooper

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// nossos próprios middlewares
app.use(middlewares);
app.use(routes);

app.listen(3000, () => {
  console.log("http://localhost:3000");
  console.log("Server activo en la puerta 3000");
});
