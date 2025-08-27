import Assignment from "../models/Assignment.js";
import Student from "../models/Student.js";
import path from "path";

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("subjectId", "name code")
      .sort({ dueDate: 1 });
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single assignment
export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate("subjectId", "name code");
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create assignment (Admin)
export const createAssignment = async (req, res) => {
  try {
    const { title, description, subjectId, dueDate, maxScore } = req.body;

    let fileUrl = "";
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    const assignment = new Assignment({
      title,
      description,
      subjectId,
      dueDate,
      maxScore,
      fileUrl,
    });

    await assignment.save();
    res.status(201).json({ message: "Assignment created", assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Submit assignment (Student)
export const submitAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // Push submission
    assignment.submissions.push({
      studentId: req.user._id,
      fileUrl,
      submittedAt: new Date(),
    });

    await assignment.save();
    res.json({ message: "Assignment submitted successfully", fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Download assignment file
export const downloadAssignmentFile = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment || !assignment.fileUrl) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.join(process.cwd(), "uploads", path.basename(assignment.fileUrl));
    res.download(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
