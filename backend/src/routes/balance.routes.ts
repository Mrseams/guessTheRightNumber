import express from "express";
import { protect } from "../middleware/auth";
import User from "../models/User";
const router = express.Router();

router.get("/", protect, async (req: any, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ balance: user.balance });
});
export default router;
