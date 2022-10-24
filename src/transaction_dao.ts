import { Collection, MongoClient, Document, Db, ObjectId } from "mongodb";

export interface Transaction {
  id?: ObjectId;
  insertionDate: string;
  value: number;
  description: string;
  category: string;
}

export class TransactionDao {
  private db: Db;
  private collection: Collection<Transaction>;

  constructor(client: MongoClient, database: string, collection: string) {
    this.db = client.db(database);
    this.collection = this.db.collection<Transaction>(collection);
  }

  listCollections(): Promise<Collection<Document>[]> {
    return this.db.collections();
  }

  insertTransaction(value: number, description: string, category: string) {
    const transaction: Transaction = {
      insertionDate: new Date().toISOString(),
      value,
      description,
      category,
    };
    const res = this.collection.insertOne(transaction);
    return res;
  }

  async findAllTransactions(): Promise<Transaction[]> {
    return await (
      await this.collection.find().toArray()
    ).map((t) => ({
      ...t,
      insertionDate: new Date(t.insertionDate).toLocaleString(),
    }));
  }
}
