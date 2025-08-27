// routes/eventRoutes.js
import express from "express";
import { getEvents, createEvent, deleteEvent } from "../../controllers/faculity/eventController.js";

const router = express.Router();

router.get("/", getEvents);          // GET all events
router.post("/", createEvent);       // POST create event
router.delete("/:id", deleteEvent);  // DELETE event by id

export default router;
