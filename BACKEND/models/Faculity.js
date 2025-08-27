import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "faculty" },
  facultyId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  phone: { type: String },
  subjects: [{ type: String }],
  avatar: { type: String }
}, { timestamps: true });

export default mongoose.model("Faculty", facultySchema);
