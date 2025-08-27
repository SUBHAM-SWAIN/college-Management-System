import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String },
    category: { type: String },
    availability: { type: String, enum: ["available","issued","reserved"], default: "available" },
    issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: null },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
