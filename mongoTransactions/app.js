const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = "banko";

// collections
const accounts = client.db(dbname).collection("accounts");
const transfers = client.db(dbname).collection("transfers");

// accounts information sender: mauricio dananiel - receiver: bruxchil saez
let account_id_sender = "MDB033221145";
let account_id_receiver = "MDB0325759";
const transaction_amount = 500;

// session
const session = client.startSession();

const main = async () => {
  try {
    // aquí comienza proceso de transacción

    const transactionResults = await session.withTransaction(async () => {
      // step 1: update the account sender balance
      const updateSenderResults = await accounts.updateOne(
        { account_id: account_id_sender },
        { $inc: { balance: -transaction_amount } },
        { session }
      );

      // step 2: update the account receiver balance
      const updateReceiverResults = await transfers.updateOne(
        { account_id: account_id_receiver },
        { $inc: { balance: transaction_amount } },
        { session }
      );

      // step 3: create a transfer document and insert it into the transfers collection
      const transfer = {
        transfer_id: "TR21872187",
        amount: 100,
        from_account: account_id_sender,
        to_account: account_id_receiver,
      };

      const insertTransferResults = await transfers.insertOne(transfer, {
        session,
      });

      // step 4 and 5: stand by
    });

    if (transactionResults) {
      console.log("Transaction Succeful");
    } else {
      console.log("The Transaction was Aborted");
    }
  } catch (e) {
    console.error(`Transaction aborted, ${e}`);
  } finally {
    await client.close();
  }
};

main();
