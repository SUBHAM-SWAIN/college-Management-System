import mongoose from "mongoose";

const borrowedBookSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ["active","overdue","returned"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("BorrowedBook", borrowedBookSchema);
