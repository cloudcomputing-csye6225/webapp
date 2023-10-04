import { databaseConnection } from "./databaseConnection.js";
import { Sequelize, DataTypes } from "sequelize";

const Assignment = databaseConnection.define(
  "Assignment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100,
      },
    },
    num_of_attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100,
      },
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    createdAt: "assignment_created",
    updatedAt: "assignment_updated",
    scopes: {
      withoutAccountId: {
        attributes: { exclude: ["AccountId"] },
      },
    },
  }
);

export default Assignment;
