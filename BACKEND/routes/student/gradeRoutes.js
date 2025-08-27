import express from "express";
import { getMyGrades } from "../../controllers/student/gradeController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMyGrades);

export default router;
