import Faculty from "../../models/Faculity.js";
import Assignment from "../../models/Assignment.js";
import Attendance from "../../models/Attendance.js"; // agar hai to
import ClassSchedule from "../../models/ClassSchedule.js"; 

// GET faculty profile
export const getFacultyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user._id).select("-__v");
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE faculty profile
export const updateFacultyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const faculty = await Faculty.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-__v");
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get Faculty Dashboard Data
// @route   GET /api/faculty/dashboard
// @access  Private (Faculty only)
export const getFacultyDashboard = async (req, res) => {
  try {
    const facultyId = req.faculty._id; // protectFaculty middleware se aayega

    // 1. Faculty Subjects
    const faculty = await Faculty.findById(facultyId).select("subjects name");
    const mySubjects = faculty?.subjects || [];

    // 2. Upcoming Classes (example dummy data / ClassSchedule model se laa sakte ho)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const upcomingClasses = await ClassSchedule.find({
      faculty: facultyId,
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate("subject", "name code");

    // 3. Recent Submissions (last 5 assignments)
    const recentSubmissions = await Assignment.find({ faculty: facultyId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("student", "name")
      .select("title createdAt");

    // 4. Attendance Stats (example)
    const totalClasses = await Attendance.countDocuments({ faculty: facultyId });
    const avgAttendance = 85; // calculate dynamically agar logic ready hai
    const highAttendance = 10; // dummy
    const lowAttendance = 2; // dummy

    res.json({
      mySubjects,
      upcomingClasses,
      recentSubmissions,
      attendanceStats: {
        totalClasses,
        avgAttendance,
        highAttendance,
        lowAttendance,
      },
    });
  } catch (error) {
    console.error("Error in getFacultyDashboard:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

