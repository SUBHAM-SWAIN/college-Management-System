import express from "express";
import {
  getEvents,
  getAllEvents,
  registerForEvent,
} from "../../controllers/student/eventController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEvents);
// Get all events
router.get("/", protect, getAllEvents);

// Register for an event
router.post("/:id/register", protect, registerForEvent);


export default router;
