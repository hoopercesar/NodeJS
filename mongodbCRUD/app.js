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

// for inserting just 1 document
// const sampleAccount = {
//   account_holder: "Petros Marcaris",
//   account_id: "MDB88219931",
//   account_type: "checking",
//   balance: 3284495,
//   last_update: new Date(),
// };

// for inserting more than 1 document
const sampleAccounts = [
  {
    account_holder: "Hannah Arendt",
    account_id: "MDB011235813",
    account_type: "checking",
    balance: 32435467,
  },

  {
    account_holder: "Federico Lorca",
    account_id: "MDB034211549",
    account_type: "saving",
    balance: 940385724,
  },
];

const main = async () => {
  try {
    await connectToDatabase();
    // insertOne method is used here to insert the sampleAccount document
    // let result = await accountsCollection.insertOne(sampleAccount);

    // insertMany methos is used here to insert many documents
    let result = await accountsCollection.insertMany(sampleAccounts);

    // console.log(`Inserted document: ${result.insertedCount}`);
    console.log(result);
  } catch (e) {
    console.error(`Error de conexión, ${e}`);
  } finally {
    await client.close();
  }
};

main();
