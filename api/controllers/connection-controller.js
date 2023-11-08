import * as connectionService from "../services/connection-service.js";
import { setResponse } from "../utils/response.js";
import statsd from "../utils/statsd.config.js";

export const checkConnection = async (req, res) => {
  statsd.increment("connection.checkConnection");
  if (
    Object.keys(req.body).length !== 0 ||
    Object.keys(req.query).length !== 0
  ) {
    setResponse(req,res, 400);
    return;
  }

  const { statusCode } = await connectionService.checkConnection();

  switch (statusCode) {
    case 200:
      setResponse(req,res, 200);
      break;
    default:
      setResponse(req,res, 503);
      break;
  }
};