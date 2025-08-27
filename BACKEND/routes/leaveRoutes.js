import express from "express";
import { getLeaves, submitLeave } from "../controllers/leaveController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all leave requests for logged-in student
router.get("/", protect, getLeaves);

// Submit a new leave request
router.post("/", protect, submitLeave);

export default router;
