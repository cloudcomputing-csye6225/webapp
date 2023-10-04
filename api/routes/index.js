import connectionRouter from "./connection-router.js";
import { setResponse } from "../utils/response.js";
import { authenticate } from "../utils/authenticate.js";
import assignmentRouter from "./assignment-router.js";

export default (app) => {
  app.use("/healthz", connectionRouter);

  app.use("/v1/assignments", authenticate, assignmentRouter);

  // TODO: handle 404 error

  app.use((req, res) => {
    setResponse(res, 405);
  });
};
