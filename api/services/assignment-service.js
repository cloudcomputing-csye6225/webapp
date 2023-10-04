import Assignment from "../models/assignment.js";

export const getAllAssignments = async () => {
  const assignments = await Assignment.scope("withoutAccountId").findAll();
  return assignments;
};

export const getAssignment = async (id, AccountId) => {
  const assignment = await Assignment.findByPk(id);
  return assignment;
};

export const getAssignmentsByAccountId = async (id, AccountId) => {
  const assignments = await Assignment.findByPk(id);
  let status = 200;

  if (!assignments) {
    status = 404;
  } else if (assignments.AccountId !== AccountId) {
    status = 403;
  }

  return status;
};

export const createAssignment = async (newAssignment, AccountId) => {
  const assignment = await Assignment.create({ ...newAssignment, AccountId });
  delete assignment.dataValues.AccountId;
  return assignment;
};

export const updateAssignment = async (id, assignment, AccountId) => {
  const status = await getAssignmentsByAccountId(id, AccountId);

  if (status === 200) {
    const updatedAssignment = await Assignment.update(assignment, {
      where: { id },
    });
    return { status: 204, updatedAssignment };
  }

  return { status };
};

export const deleteAssignment = async (id, AccountId) => {
  const status = await getAssignmentsByAccountId(id, AccountId);

  if (status === 200) {
    const deletedAssignment = await Assignment.destroy({ where: { id } });
    return { status: 204, deletedAssignment };
  }

  return { status };
};
