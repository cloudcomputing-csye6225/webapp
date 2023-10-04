import express from "express";
import * as connectionController from "../controllers/connection-controller.js";

const router = express.Router();

router.get("/", connectionController.checkConnection);

// TODO: handle 405 error

export default router;
