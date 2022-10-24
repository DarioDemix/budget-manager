import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { TransactionDao } from "./transaction_dao";
import { Api } from "./api";

config();

const { PORT, DATABASE, COLLECTION, MONGO_URI } = process.env;

const main = async () => {
  const client = new MongoClient(MONGO_URI!);

  await client.connect();
  await client.db(DATABASE).command({ ping: 1 });
  console.log("Connected successfully to server");

  const budgetDao = new TransactionDao(
    client,
    DATABASE || "budget",
    COLLECTION || "transactions"
  );

  new Api(Number(PORT), budgetDao).startServer();
};

main();
