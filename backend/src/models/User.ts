import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  role: { type: String, default: "client" },
  balance: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
