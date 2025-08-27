import Grade from "../../models/Grade.js";

// ✅ Get logged-in student's grades
export const getMyGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.user.id }).populate("subject");
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grades", error });
  }
};
