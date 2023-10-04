import { databaseConnection } from "../models/databaseConnection.js";

export const checkConnection = async () => {
  try {
    await databaseConnection.authenticate();
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log(
      "connection-service.js - database authenticate error - ",
      error
    );
    return { statusCode: error.parent.errno };
  }
};
