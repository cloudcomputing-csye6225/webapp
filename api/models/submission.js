import { databaseConnection } from "./databaseConnection.js";
import { Sequelize, DataTypes } from "sequelize";

const Submission = databaseConnection.define(
  "Submission",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    assignment_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    submission_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: {
          protocols: ["http", "https"],
          requireProtocol: true,
        },
        valueEndingWithZip(value) {
          if (!value.endsWith(".zip")) {
            throw new Error("Submission URL should end with .zip extension");
          }
        },
      },
    },
  },
  {
    createdAt: "submission_date",
    updatedAt: "submission_updated",
    scopes: {
      withoutAccountId: {
        attributes: { exclude: ["AccountId"] },
      },
    },
  }
);

export default Submission;
