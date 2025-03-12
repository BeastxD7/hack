import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor"], required: true },
  specialization: { type: String },
  licenseNumber: { type: String },
  status: { type: String, enum: ["pendingApproval", "approved"], default: "approved" }, // Doctor-specific
});

const User = mongoose.model("User", userSchema);
export default User;
