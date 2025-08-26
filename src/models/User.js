import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  day: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);