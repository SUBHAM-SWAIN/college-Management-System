import Leave from "../models/Leave.js"; // leave model
import Student from "../models/Student.js";

// @desc    Get all leave requests for logged-in student
// @route   GET /api/leaves
// @access  Private
export const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ studentId: req.user._id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Submit a new leave request
// @route   POST /api/leaves
// @access  Private
export const submitLeave = async (req, res) => {
  try {
    const { type, startDate, endDate, reason } = req.body;

    if (!type || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newLeave = await Leave.create({
      studentId: req.user._id,
      type,
      startDate,
      endDate,
      reason,
      status: "pending",
    });

    res.status(201).json(newLeave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
