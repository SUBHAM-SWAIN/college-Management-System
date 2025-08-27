import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get profile
router.get("/profile", protect, getStudentProfile);

// Update profile
router.put("/profile", protect, updateStudentProfile);

export default router;
