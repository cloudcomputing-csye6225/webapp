import express from "express";
import * as connectionController from "../controllers/connection-controller.js";
import { setResponse } from "../utils/response.js";

const router = express.Router();

router
  .route("/")
  .get(connectionController.checkConnection)
  .all((req, res) => {
    setResponse(req,res, 405);
  });

export default router;
