// models/materialModel.js
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["lecture", "assignment", "reference", "exam"],
      required: true,
    },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    fileName: { type: String, required: true },
    fileSize: { type: String },
    uploadDate: { type: Date, default: Date.now },
    downloads: { type: Number, default: 0 },
    uploadedBy: { type: String, required: true }, // faculty name
  },
  { timestamps: true }
);

export default mongoose.model("Material", materialSchema);
