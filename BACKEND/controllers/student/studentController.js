import Student from "../../models/Student.js";

// @desc    Get logged-in student's profile
// @route   GET /api/students/profile
// @access  Private
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select("-__v");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update logged-in student's profile
// @route   PUT /api/students/profile
// @access  Private
export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update fields from request body
    const fieldsToUpdate = [
      "name",
      "email",
      "phone",
      "address",
      "avatar",
      "course",
      "semester",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        student[field] = req.body[field];
      }
    });

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
