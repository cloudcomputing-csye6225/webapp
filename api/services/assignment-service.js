import Assignment from "../models/assignment.js";
import Submission from "../models/submission.js";
import { publishMessageToSns } from "../utils/publish-to-sns.js";

export const createAssignment = async (newAssignment, AccountId) => {
  const assignment = await Assignment.create({ ...newAssignment, AccountId });
  delete assignment.dataValues.AccountId;
  return assignment;
};

export const getAllAssignments = async () => {
  const assignments = await Assignment.scope("withoutAccountId").findAll();
  return assignments;
};

export const getAssignment = async (id, AccountId) => {
  const assignment = await Assignment.findByPk(id);
  return assignment;
};



export const deleteAssignment = async (id, AccountId) => {
  const status = await getAssignmentsByAccountId(id, AccountId);

  if (status === 200) {
    const deletedAssignment = await Assignment.destroy({ where: { id } });
    return { status: 204, deletedAssignment };
  }

  return { status };
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

export const submitAssignment = async (assignment_id, submission_url, user) => {



  const assignment = await Assignment.findByPk(assignment_id);

  

  if (!assignment) {
    return { status: 404, message: "Assignment not found" };
  }

  const currentDate = new Date();
  if (currentDate > new Date(assignment.deadline)) {
    return { status: 400, message: "Assignment deadline has passed" };
  }

  const submissionAttempts = await getSubmissionAttempts(assignment_id);
  if (submissionAttempts.length >= assignment.num_of_attempts) {
    return { status: 400, message: "Exceeded number of attempts" };
  }

  const submission = await Submission.create({
    assignment_id,
    submission_url,
    // submission_date: new Date().toISOString(),
  });

  const message = {
    submission_url: submission.submission_url,
    email: user.email,
    assignment_id: assignment.id,
  };

  console.log(message);

  await publishMessageToSns(JSON.stringify(message));

  return  submission;

};

export const getSubmissionAttempts = async (assignment_id) => {
  const subattempt = await Submission.findAll({
    where: { assignment_id },
  });
  console.log(subattempt);
  return subattempt;
};
