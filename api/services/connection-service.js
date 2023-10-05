import { databaseConnection } from "../models/databaseConnection.js";

export const checkConnection = async () => {
  try {
    await databaseConnection.authenticate();
    return {
      statusCode: 200,
    };
  } catch (error) {
    return { statusCode: error.parent.errno };
  }
};
