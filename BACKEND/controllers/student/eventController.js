import Event from "../../models/Event.js";
import Student from "../../models/Student.js";


// ✅ Get all upcoming events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } }).sort("date");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};
// @desc    Get all events
// @route   GET /api/events
// @access  Private
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // ascending by date
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Register logged-in student for an event
// @route   POST /api/events/:id/register
// @access  Private
export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const studentId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if maxParticipants limit reached
    if (event.maxParticipants && event.registeredCount >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Here, you can also keep a list of registered students if needed
    // For simplicity, we'll just increment registeredCount
    event.registeredCount = (event.registeredCount || 0) + 1;
    await event.save();

    res.json({ message: "Registration successful", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
