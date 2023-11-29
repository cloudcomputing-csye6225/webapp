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
