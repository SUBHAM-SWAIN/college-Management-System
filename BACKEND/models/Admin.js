import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "admin" },
  adminId: { type: String, required: true, unique: true },
  department: { type: String },
  permissions: [{ type: String }],
  avatar: { type: String }
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
