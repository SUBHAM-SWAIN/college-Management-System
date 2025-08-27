import express from "express";
import { getFacultyProfile, updateFacultyProfile,getFacultyDashboard } from "../../controllers/faculity/facultyController.js";
import { protectFaculty } from "../../middleware/authMiddleware.js";

const router = express.Router();

// GET faculty profile
router.get("/profile", protectFaculty, getFacultyProfile);

// UPDATE faculty profile
router.put("/profile", protectFaculty, updateFacultyProfile);

router.get("/dashboard", protectFaculty, getFacultyDashboard);


export default router;
