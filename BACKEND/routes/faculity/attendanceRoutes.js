import express from "express";
import {
  markAttendance,
  getAttendance,
  getStudentAttendance,
} from "../../controllers/faculity/attendanceController.js";
import { protectFaculty } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Faculty marks attendance
router.post("/", protectFaculty, markAttendance);

// Faculty / Student fetch attendance for subject & date
router.get("/:subjectId", getAttendance);

// Student specific report
router.get("/student/:studentId", getStudentAttendance);

export default router;
