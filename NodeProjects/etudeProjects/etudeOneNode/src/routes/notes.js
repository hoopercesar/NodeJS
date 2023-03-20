const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// database

const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");

const client = new MongoClient(uri);
const dbname = "Chat";
const collection_name = "conversaciones";

const accountsCollection = client.db(dbname).collection(collection_name);

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
        speak: 1,
        name: note.title,
        mensaje: note.description,
        hora: note.date,
      },
    ];
    const documentsToFind = { speak: 1 };

    const main = async () => {
      try {
        await connectToDatabase();
        // let u = await accountsCollection.insertMany(sampleAccounts);
        let datos = await accountsCollection.find(documentsToFind);
        console.log(datos);
      } catch (e) {
        console.error(`Error de conexión, ${e}`);
      } finally {
        await client.close();
      }
    };

    main();

    // para acceder a DB
    const ingreso = async () => {
      try {
        await connectToDatabase();
        let datos = await accountsCollection.find(documentsToFind);
        console.log(datos);
      } catch (e) {
        console.error(`Error de conexión, ${e}`);
      } finally {
        await client.close();
      }
    };
    ingreso();

    // main(note);
    const chat = [];
    let hora = `${note.date.getHours()}:${note.date.getMinutes()}:${note.date.getSeconds()}`;
    chat.push(`${note.title.toUpperCase()}: (${hora}) - ${note.description}`);

    res.render("notes/new-note", {
      chat,
    });
    // console.log("en notes", note);
  }
});

router.get("notes", (req, res) => {
  res.send("notes from database");
});

module.exports = router;
