import Assignment from "../../models/Assignment.js";
import mongoose from "mongoose";

// Get all assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("subjectId", "name");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all submissions of an assignment
export const getSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(assignmentId))
      return res.status(400).json({ message: "Invalid assignment ID" });

    const assignment = await Assignment.findById(assignmentId).populate("submissions.studentId", "name email studentId");
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    res.json(assignment.submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Grade a submission
export const gradeSubmission = async (req, res) => {
  try {
    const { assignmentId, submissionId } = req.params;
    const { grade, feedback } = req.body;

    if (!mongoose.Types.ObjectId.isValid(assignmentId) || !mongoose.Types.ObjectId.isValid(submissionId))
      return res.status(400).json({ message: "Invalid ID" });

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const submission = assignment.submissions.id(submissionId);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = "graded";

    await assignment.save();
    res.json({ message: "Submission graded", submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a student submission
export const addSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { studentId, fileUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(assignmentId) || !mongoose.Types.ObjectId.isValid(studentId))
      return res.status(400).json({ message: "Invalid ID" });

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    const submission = {
      studentId,
      fileUrl,
      submittedAt: new Date(),
      status: "submitted",
    };

    assignment.submissions.push(submission);
    await assignment.save();

    res.json({ message: "Submission added", submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
