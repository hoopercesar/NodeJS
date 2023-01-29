require("dotenv").config();

const csurf = require("tiny-csrf");
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

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const routes = require("./routes");
const path = require("path");
const helmet = require("helmet");

const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");
const { checkPrime } = require("crypto");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(helmet());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());

// configuracion de session
const sessionOptions = session({
  secret: "este es el secreto",
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csurf("123456789iamasecret987654321look"));

// nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on("Listo", () => {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
    console.log("Server activo en la puerta 3000");
  });
});
