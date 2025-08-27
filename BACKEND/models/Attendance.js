import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent", "late"], required: true },
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
