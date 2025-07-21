import mongoose from "mongoose";
const gameSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  generatedNumber: Number,
  result: { type: String, enum: ["gagné", "perdu"] },
  balanceChange: Number,
  newBalance: Number,
  date: { type: Date, default: Date.now },
});
export default mongoose.model("Game", gameSchema);
