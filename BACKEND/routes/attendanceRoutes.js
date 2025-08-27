import express from "express";
import { getMyAttendance } from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student can view their attendance
router.get("/me", protect, getMyAttendance);

export default router;
