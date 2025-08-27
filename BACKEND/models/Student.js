import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "student" },
  studentId: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  semester: { type: Number, required: true },
  phone: { type: String },
  address: { type: String },
  avatar: { type: String }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
