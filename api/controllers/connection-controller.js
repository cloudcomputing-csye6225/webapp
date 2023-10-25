import * as connectionService from "../services/connection-service.js";
import { setResponse } from "../utils/response.js";

export const checkConnection = async (req, res) => {
  if (
    Object.keys(req.body).length !== 0 ||
    Object.keys(req.query).length !== 0
  ) {
    setResponse(res, 400);
    return;
  }

  const { statusCode } = await connectionService.checkConnection();

  switch (statusCode) {
    case 200:
      setResponse(res, 200);
      break;
    default:
      setResponse(res, 503);
      break;
  }
};