import Assignment from "../models/assignment.js";

export const getAllAssignments = async () => {
  try {
    const assignments = await Assignment.findAll();
    return { status: 200, assignments };
  } catch (error) {
    return { status: error };
  }
};

export const createAssignment = async (newAssignment, AccountId) => {
  try {
    const assignment = await Assignment.create({ ...newAssignment, AccountId });
    return { status: 201, assignment };
  } catch (error) {
    return { status: error };
  }
};

export const getAssignment = async (id, AccountId) => {
  try {
    let assignment = await Assignment.findByPk(id);
    let status = 200;

    if (!assignment) {
      status = 404;
      assignment = {};
    }

    if (assignment.AccountId !== AccountId) {
      status = 403;
      assignment = {};
    }

    return { status, assignment };
  } catch (error) {
    return { status: error };
  }
};

export const deleteAssignment = async (id, AccountId) => {
  try {
    const { status } = await getAssignment(id, AccountId);

    if (status === 200) {
      const deletedAssignment = await Assignment.destroy({ where: { id } });
      return { status: 200, deletedAssignment };
    }

    return { status };
  } catch (error) {
    return { status: error };
  }
};

export const updateAssignment = async (id, assignment, AccountId) => {
  try {
    const { status } = await getAssignment(id, AccountId);

    if (status === 200) {
      const updatedAssignment = await Assignment.update(assignment, {
        where: { id },
      });
      return { status: 200, updatedAssignment };
    }
    return { status };
  } catch (error) {
    return { status: error };
  }
};
