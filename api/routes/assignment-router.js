import express from "express";
import * as assignmentController from "./../controllers/assignment-controller.js";
import { setResponse } from "../utils/response.js";

const router = express.Router();

router.get("/", assignmentController.getAll);

router.post("/", assignmentController.post);

router.get("/:id", assignmentController.getById);

router.delete("/:id", assignmentController.deleteById);

router.put("/:id", assignmentController.updateById);

router.all((req, res) => {
  setResponse(res, 405);
});

export default router;
