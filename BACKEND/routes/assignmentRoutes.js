import express from "express";
import {
  getAssignments,
  getAssignment,
  createAssignment,
  submitAssignment,
  downloadAssignmentFile,
} from "../controllers/assignmentController.js";
import upload from "../middleware/multer.js"; // multer middleware
import { protect } from "../middleware/authMiddleware.js"; // optional: authentication middleware

const router = express.Router();

// Public routes (or use protect middleware)
router.get("/", protect, getAssignments);
router.get("/:id", protect, getAssignment);

// Admin route to create assignment
router.post("/", protect, upload.single("file"), createAssignment);

// Student submits assignment
router.post("/submit/:assignmentId", protect, upload.single("file"), submitAssignment);

// Download assignment file
router.get("/download/:assignmentId", protect, downloadAssignmentFile);

export default router;
