import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
