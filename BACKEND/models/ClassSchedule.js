import mongoose from "mongoose";

const classScheduleSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true
  },
  startTime: {
    type: String, // Example: "09:00 AM"
    required: true
  },
  endTime: {
    type: String, // Example: "10:30 AM"
    required: true
  },
  room: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model("ClassSchedule", classScheduleSchema);
