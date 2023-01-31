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

// account_id: 'MDB88219931',

// to update one document
// const documentsToUpdate = { account_id: "MDB88219931" };
// const update = { $inc: { balance: 100 } };

// to update many documents
const documentsToUpdate = { account_type: "checking" && "saving" };
const update = {
  $push: {
    transfer_complete: "TRF433301",
    pelotas_negras: "perreo2133",
  },
};

const main = async () => {
  try {
    await connectToDatabase();

    // one document
    // let result = accountsCollection.updateOne(documentsToUpdate, update);
    //     console.log(await result);
    // (await result).modifiedCount === 1
    //   ? console.log("Update one document")
    //   : console.log("No document updated");

    //many documents
    let result = accountsCollection.updateMany(documentsToUpdate, update);
    console.log((await result).modifiedCount);

    // let result2 = accountsCollection.find();
    // result2.forEach((doc) => console.log(doc));
    //
  } catch (e) {
    console.error(`Error de conexión, ${e}`);
  } finally {
    await client.close();
  }
};

main();
