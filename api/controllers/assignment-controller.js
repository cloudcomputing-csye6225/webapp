import * as assignmentService from "./../services/assignment-service.js";
import { setResponse } from "../utils/response.js";
import { Sequelize } from "sequelize";
import statsd from "../utils/statsd.config.js";

export const post = async (request, response) => {
  statsd.increment("assignment.post");

  try {
    const assignment = await assignmentService.createAssignment(
      request.body,
      request.user.AccountId
    );
    setResponse(request,response, 201, assignment);
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      error = error.message;
    } else if (error instanceof Sequelize.ValidationError) {
      error = error.errors[0].message;
    }

    setResponse(request,response, 400, error);
  }
};

export const getAll = async (request, response) => {
  statsd.increment("assignment.getAll");

  try {
    const assignments = await assignmentService.getAllAssignments();
    setResponse(request,response, 200, assignments);
  } catch (error) {
    setResponse(request,response, 400, error);
  }
};

export const deleteById = async (request, response) => {
  statsd.increment("assignment.deleteById");

  try {
    const { status } = await assignmentService.deleteAssignment(
      request.params.id,
      request.user.AccountId
    );
    setResponse(request,response, status);
  } catch (error) {
    setResponse(request,response, 400, error);
  }
};


export const getById = async (request, response) => {
  statsd.increment("assignment.getById");

  try {
    const assignment = await assignmentService.getAssignment(request.params.id);
    if (assignment) {
      setResponse(request,response, 200, assignment);
    } else {
      setResponse(request,response, 404);
    }
  } catch (error) {
    setResponse(request,response, 400, error);
  }
};

export const updateById = async (request, response) => {
  statsd.increment("assignment.updateById");
  try {
    const { status } = await assignmentService.updateAssignment(
      request.params.id,
      request.body,
      request.user.AccountId
    );
    setResponse(request,response, status);
  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      error = error.message;
    } else if (error instanceof Sequelize.ValidationError) {
      error = error.errors[0].message;
    }

    setResponse(request,response, 400, error);
  }
};

export const postAssignmentSubmission = async (request, response) => {
  statsd.increment("assignment.postAssignmentSubmission");
  try {
    const submission = await assignmentService.submitAssignment(
      request.params.id,
      request.body.submission_url,
      request.user
    );
    setResponse(request, response, 201, submission);

  } catch (error) {
    if (error instanceof Sequelize.DatabaseError) {
      error = error.message;
    } else if (error instanceof Sequelize.ValidationError) {
      error = error.errors[0].message;
    }
    setResponse(request, response, 400, error);
  }
};
