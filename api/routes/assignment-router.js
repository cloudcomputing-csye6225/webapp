import express from "express";
import * as assignmentController from "./../controllers/assignment-controller.js";
import { setResponse } from "../utils/response.js";
import {
  checkPayLoadForPost,
  checkPayLoadForPutRequest,
  checkPayloadBody,
} from "../utils/payload.js";

const schemaFields = ["name", "points", "num_of_attempts", "deadline"];

const optionalFields = ["assignment_created", "assignment_updated"];

const router = express.Router();

router
  .route("/")
  .get(checkPayloadBody, assignmentController.getAll)
  .post(checkPayLoadForPost(schemaFields, optionalFields), assignmentController.post)
  .all((req, res) => {
    setResponse(req,res, 405);
  });

router
  .route("/:id")
  .get(checkPayloadBody, assignmentController.getById)
  .delete(checkPayloadBody, assignmentController.deleteById)
  .put(
    checkPayLoadForPutRequest(schemaFields, optionalFields),
    assignmentController.updateById
  )
  .all((req, res) => {
    setResponse(req,res, 405);
  });

export default router;
