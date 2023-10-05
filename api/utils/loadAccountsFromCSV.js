import fs from "fs";
import csvParser from "csv-parser";
import bcrypt from "bcrypt";
import { databaseConnection } from "../models/databaseConnection.js";
import Account from "../models/account.js";

export const loadAccountsFromCSV = async () => {
  try {
    await databaseConnection.authenticate();
    console.log("Connected to the database");

    fs.createReadStream("./opt/user.csv")
      .pipe(csvParser())
      .on("data", async (row) => {
        try {
          const existingAccount = await Account.findOne({
            where: { email: row.email },
          });

          if (!existingAccount) {
            row.password = await bcrypt.hash(row.password, 10);
            await Account.create(row);
          }
        } catch (error) {
        }
      })
      .on("end", () => {
        console.log("Finished loading accounts.");
      });
  } catch (error) {
    console.error(
      "Error connecting to the database",
      error
    );
  }
};
