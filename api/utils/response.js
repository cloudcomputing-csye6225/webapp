import { logger } from "./logger.js";
import statsd from "./statsd.config.js";

export const setResponse = async (res, status, data) => {
  statsd.increment(`http.response.${status}`);

  if (status >= 400) {
    logger.error(`Status is ${status} , Message is ${JSON.stringify(data || "")}`);
  } else {
    logger.info(`Status is ${status} , Message is ${JSON.stringify(data || "")}`);
  }

  res
    .status(status)
    .header("cache-control", "no-cache, no-store")
    .header("pragma", "no-cache")
    .json(data);
};