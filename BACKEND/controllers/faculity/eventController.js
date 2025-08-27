// controllers/eventController.js
import Event from "../../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, type, maxParticipants, createdBy } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      type,
      maxParticipants,
      createdBy,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
