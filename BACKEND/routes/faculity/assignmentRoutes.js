import express from "express";
import { 
  getAllAssignments,
  getSubmissions,
  gradeSubmission,
  addSubmission
} from "../../controllers/faculity/assignmentController.js";

const router = express.Router();

// Assignments
router.get("/", getAllAssignments);

// Submissions
router.get("/:assignmentId/submissions", getSubmissions);
router.post("/:assignmentId/submissions", addSubmission);
router.put("/:assignmentId/submissions/:submissionId/grade", gradeSubmission);

export default router;
