import express from "express";
import { protect } from "../middleware/auth";
import Game from "../models/Game";
import User from "../models/User";
const router = express.Router();

router.post("/play", protect, async (req: any, res) => {
  const number = Math.floor(Math.random() * 101);
  const result = number > 70 ? "gagné" : "perdu";
  const balanceChange = result === "gagné" ? 50 : -35;
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  user.balance += balanceChange;
  await user.save();

  await Game.create({
    user: user._id,
    generatedNumber: number,
    result,
    balanceChange,
    newBalance: user.balance,
  });
  res.json({ result, generatedNumber: number, newBalance: user.balance });
});

export default router;
