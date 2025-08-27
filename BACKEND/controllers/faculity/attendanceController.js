import Attendance from "../../models/Attendance.js";

// @desc    Mark attendance for a subject
// @route   POST /api/attendance
// @access  Faculty
export const markAttendance = async (req, res) => {
  try {
    const { subjectId, date, attendance } = req.body;

    if (!subjectId || !date || !attendance) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const facultyId = req.user._id; // protectFaculty middleware se ayega

    // Save each student's attendance
    const records = await Promise.all(
      attendance.map((record) =>
        Attendance.findOneAndUpdate(
          { studentId: record.studentId, subjectId, date },
          {
            studentId: record.studentId,
            subjectId,
            facultyId,
            date,
            status: record.status,
          },
          { upsert: true, new: true }
        )
      )
    );

    res.status(201).json({
      message: "Attendance marked successfully",
      records,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get attendance for a subject & date
// @route   GET /api/attendance/:subjectId?date=YYYY-MM-DD
// @access  Faculty/Student
export const getAttendance = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { date } = req.query;

    const query = { subjectId };
    if (date) query.date = new Date(date);

    const records = await Attendance.find(query)
      .populate("studentId", "name studentId")
      .populate("subjectId", "name code");

    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get student attendance report
// @route   GET /api/attendance/student/:studentId
// @access  Student
export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.find({ studentId })
      .populate("subjectId", "name code")
      .sort({ date: -1 });

    res.json(records);
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};
