import { databaseConnection } from "../models/databaseConnection.js";
import Assignment from "../models/assignment.js";
import Account from "../models/account.js";
import { loadAccountsFromCSV } from "./loadAccountsFromCSV.js";
import Submission from "../models/submission.js";

Assignment.belongsTo(Account, { foreignKey: { allowNull: false } });
Account.hasMany(Assignment);

// Submission.belongsTo(Assignment, {
//   foreignKey: { allowNull: false },
//   onDelete: "CASCADE",
// });

export const syncDatabase = async () => {
  try {
    await databaseConnection.sync({ alter: true });

    await loadAccountsFromCSV();
  } catch (error) {
    console.log(error);
  }
};
