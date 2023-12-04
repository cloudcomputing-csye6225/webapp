import { logger } from "./logger.js";

export const setResponse = async (req, res, status, data) => {

  const endpoint = req.originalUrl;
  const method = req.method;

  if (status >= 400) {
    logger.error(`Status is ${status} for ${endpoint},Method=${method}, Data sent is ${JSON.stringify(data || "")}`);
  } else {
    logger.info(`Status is ${status} for ${endpoint},Method=${method}, Data sent is ${JSON.stringify(data || "")}`);
  }

  res
    .status(status)
    .header("cache-control", "no-cache, no-store")
    .header("pragma", "no-cache")
    .json(data);
};