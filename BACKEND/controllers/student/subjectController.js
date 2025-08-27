import Subject from "../../models/Subject.js";

// ✅ Get subjects of student's course
export const getMySubjects = async (req, res) => {
  try {
    const student = req.user; // from auth
    const subjects = await Subject.find({ course: student.course });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects", error });
  }
};
