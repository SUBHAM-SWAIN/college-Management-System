import Attendance from "../models/Attendance.js";

// ✅ Get logged-in student's attendance
export const getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.user.id }).populate("subject");
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};
