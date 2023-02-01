const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = "banko";

// collections
const accounts = client.db(dbname).collection("accounts");
const transfers = client.db(dbname).collection("transfers");

// accounts information
let account_id_sender = "MDB034232889";
let account_id_receiver = "MDB0325759";
const transaction_amount = 100;

// session
const session = client.startSession();

const main = async () => {
  try {
    // aquí comienza proceso de transacción

    const transactionResults = await session.withTransaction(async () => {
      //
    });
  } catch (e) {
    console.error(`Error de conexión, ${e}`);
  } finally {
    await client.close();
  }
};

main();
