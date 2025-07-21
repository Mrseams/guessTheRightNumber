// src/routes/history.routes.ts
import express from "express";
import { protect, isAdmin } from "../middleware/auth";
import Game from "../models/Game";
const router = express.Router();

router.get("/", protect, async (req: any, res) => {
  const games = await Game.find({ user: req.user.id }).sort({ date: -1 });
  res.json(games);
});

router.get("/all", protect, isAdmin, async (_req, res) => {
  const games = await Game.find()
    .populate("user", "username email")
    .sort({ date: -1 });
  res.json(games);
});
export default router;
