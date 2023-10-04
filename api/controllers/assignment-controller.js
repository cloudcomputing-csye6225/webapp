import * as assignmentService from "./../services/assignment-service.js";

export const getAll = async (request, response) => {
  try {
    const { status, assignments } = await assignmentService.getAllAssignments();
    response.status(status).json(assignments);
  } catch (error) {
    response.status(404).json(error);
  }
};

export const post = async (request, response) => {
  try {
    const { status, assignment } = await assignmentService.createAssignment(
      request.body,
      request.user.AccountId
    );
    response.status(status).json(assignment);
  } catch (error) {
    response.status(404).json(error);
  }
};

export const getById = async (request, response) => {
  try {
    const { status, assignment } = await assignmentService.getAssignment(
      request.params.id,
      request.user.AccountId
    );
    response.status(status).json(assignment);
  } catch (error) {
    response.status(404).json(error);
  }
};

export const updateById = async (request, response) => {
  try {
    const { status, updatedAssignment } =
      await assignmentService.updateAssignment(
        request.params.id,
        request.body,
        request.user.AccountId
      );
    response.status(status).json(updatedAssignment);
  } catch (error) {
    response.status(404).json(error);
  }
};

export const deleteById = async (request, response) => {
  try {
    const { status } = await assignmentService.deleteAssignment(
      request.params.id,
      request.user.AccountId
    );
    response.status(status).json();
  } catch (error) {
    response.status(404).json(error);
  }
};
