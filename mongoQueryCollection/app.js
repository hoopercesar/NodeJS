const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

// console.log(uri);

const client = new MongoClient(uri);
const dbname = "banko";
const collection_name = "accounts";

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

// this is the document to find with the filter > 4700
// const documentsToFind = { balance: { $gt: 4700 } };

// to find just one document
const documentsToFind = { balance: 940385724 };

const main = async () => {
  try {
    await connectToDatabase();

    // the find() method is used to find documents that match the filter
    // let results = accountsCollection.find(documentsToFind);
    // let cuenta = accountsCollection.countDocuments(documentsToFind);
    // console.log(
    //   `There were found ${await cuenta} documents that match the filter`
    // );
    // await results.forEach((doc) => console.log(doc));

    // the findOne() methos is used to find the first document that matches the filter
    let result = await accountsCollection.findOne(documentsToFind);
    console.log(result);
  } catch (e) {
    console.error(`Error de conexión, ${e}`);
  } finally {
    await client.close();
  }
};

main();
