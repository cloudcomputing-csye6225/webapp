import { setResponse } from "./response.js";
import * as connectionService from "../services/connection-service.js";

export const checkHealth = async (req, res, next) => {
  const { statusCode } = await connectionService.checkConnection();

  if (statusCode == 200) {
    return next();
  } else {
    setResponse(req, res, 503);
  }
};
