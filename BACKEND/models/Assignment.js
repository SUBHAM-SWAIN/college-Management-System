import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    dueDate: { type: Date, required: true },
    maxScore: { type: Number, required: true },
    fileUrl: { type: String },
    submissions: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        fileUrl: String,
        submittedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
