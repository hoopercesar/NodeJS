const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// database

const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");

const client = new MongoClient(uri);
const dbname = "Chat";
// const collection_name = "conversaciones";

// const accountsCollection = client.db(dbname).collection(collection_name);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Te has conectado al ${dbname} con éxito`);

    // Lista las bases de datos en el cluster
    const dbs = await client.db().admin().listDatabases();
    // console.table(dbs.databases);
  } catch (err) {
    console.error(`Error de conección a la DB, ${err}`);
  }
};

router.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", async (req, res) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title) errors.push({ text: "Write a Title" });
  if (!description) errors.push({ text: "Write a description" });

  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const note = new Note({ title, description });
    const sampleAccounts = [
      {
        speak: 2,
        name: note.title,
        mensaje: note.description,
        hora: note.date,
      },
    ];

    // Se crea una colección con nombre de usuario
    const collection_name = note.title;
    const accountsCollection = client.db(dbname).collection(collection_name);

    const documentsToFind = { speak: 2 };
    let chat = [];

    const main = async () => {
      try {
        await connectToDatabase();

        let datos = await accountsCollection.insertMany(sampleAccounts);
        //

        let colecciones = await client.db(dbname).listCollections().toArray();
        console.log(colecciones);
        colecciones.map(async (coleccion) => {
          let collection = await client
            .db(dbname)
            .collection(coleccion.name)
            .find()
            .toArray();

          console.log(coleccion.name, collection);
          // let mensajes = await collection.find(documentsToFind);
          chat.push({
            // texto: `${mensaje.name.toUpperCase()}: ${mensaje.mensaje}`,
          });
        });
        res.render("notes/new-note", {
          chat,
        });
        console.log(chat.length);
        // chat = `${mensajes.mensaje}`

        // mensajes.map((mensaje) => {
        //   console.log(mensaje);
        // });
      } catch (e) {
        console.error(`Error de conexión, ${e}`);
      } finally {
        await client.close();
      }
    };
    main();

    // const chat = [];
    // let hora = `${note.date.getHours()}:${note.date.getMinutes()}:${note.date.getSeconds()}`;
    // chat.push(`${note.title.toUpperCase()}: (${hora}) - ${note.description}`);

    // res.render("notes/new-note", {
    //   chat,
    // });
    // console.log("en notes", note);
  }
});

router.get("notes", (req, res) => {
  res.send("notes from database");
});

module.exports = router;
