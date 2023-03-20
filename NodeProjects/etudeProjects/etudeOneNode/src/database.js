const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");
const note = require("./routes/notes");

const client = new MongoClient(uri);
const dbname = "Chat";
const collection_name = "conversaciones";

const accountsCollection = client.db(dbname).collection(collection_name);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Conexión a la DB ${dbname} con éxito`);

    // Lista las bases de datos en el cluster
    const dbs = await client.db().admin().listDatabases();
    console.table(dbs.databases);
  } catch (err) {
    console.error(`Error de conección a la DB, ${err}`);
  }
};
const documentsToFind = { speak: 1 };

let sampleAccounts = [
  {
    name: note.title,
    mensaje: note.description,
  },
];
// [
//   {
//     name: "pepe",
//     mensaje: "hola mundo",
//   },
// ];
// console.log(note);

const main = async () => {
  try {
    await connectToDatabase();
    let result = await accountsCollection.insertMany(sampleAccounts);
    // let datos = await accountsCollection.find(documentsToFind);
    console.log(result);
  } catch (e) {
    console.error(`Error de conexión, ${e}`);
  } finally {
    await client.close();
  }
};

module.exports = main;
