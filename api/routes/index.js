import connectionRouter from "./connection-router.js";
import { setResponse } from "../utils/response.js";
import { authenticate } from "../utils/authenticate.js";
import assignmentRouter from "./assignment-router.js";
import { checkHealth } from "../utils/check-health.js";

export default (app) => {
  app.use("/healthz", connectionRouter);

  app.use("/demo/assignments",checkHealth, authenticate, assignmentRouter);

  app.use((req, res) => {
    setResponse(req,res, 404);
  });
};
