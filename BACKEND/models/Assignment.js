import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  dueDate: { type: Date, required: true },
  maxScore: { type: Number, required: true },
  fileUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
