const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

console.log(uri);

const client = new MongoClient(uri);
const dbname = "banko";

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

const main = async () => {
  try {
    await connectToDatabase();
  } catch (e) {
    console.error(`Error de conexión, ${e}`);
  } finally {
    await client.close();
  }
};

main();
