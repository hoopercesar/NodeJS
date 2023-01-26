require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se realizó la conexión");
    app.emit("Listo");
  })
  .catch((err) => console.error(err));

const routes = require("./routes");
const path = require("path");
const middlewares = require("./src/middlewares/middleware");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// nossos próprios middlewares
app.use(middlewares);
app.use(routes);

app.on("Listo", () => {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
    console.log("Server activo en la puerta 3000");
  });
});
