import { Express, Request, Response } from "express";
import e from "express";
import * as bodyParser from "body-parser";
import { TransactionDao } from "./transaction_dao";

export class Api {
  private app: Express;
  constructor(private port: number, private dao: TransactionDao) {
    this.app = e();
    this.app.use(bodyParser.json());
  }
  startServer() {
    this.app.post("/transaction", async (req: Request, res: Response) => {
      const { value, description, category } = req.body;

      const result = await this.dao.insertTransaction(
        value,
        description,
        category
      );

      res.status(201).send(result.insertedId);
    });

    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}
