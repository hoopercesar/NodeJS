const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const main = require("./database");
// const MongoStore = require("connect-mongo");

// Initializations
main();
const app = express();
const sessionOptions = session({
  secret: "este es el secreto",
  // store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   maxAge: 1000 * 60 * 60 * 24 * 7,
  //   httpOnly: true,
  // },
});

// Settings (sección de configuración)
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// config view engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(sessionOptions);

// Globals variables

// Routes
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

// Statics files
app.use(express.static(path.join(__dirname, "public")));

// Server is listening
app.listen(app.get("port"), () => {
  console.log("Server Listening on Port", app.get("port"));
  // console.log(app.get(port));
});

// app.on("Listo", () => {
//   app.listen(3000, () => {
//     console.log("http://localhost:3000");
//     console.log("Server activo en la puerta 3000");
//   });
// });
