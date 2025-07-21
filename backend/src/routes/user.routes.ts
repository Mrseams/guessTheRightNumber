import bcrypt from "bcryptjs";
import express from "express";
import User from "../models/User";
import { protect, isAdmin } from "../middleware/auth";
const router = express.Router();

router.get("/me", protect, async (req: any, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.get("/", protect, isAdmin, async (_req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.post("/", protect, isAdmin, async (req, res) => {
  const { username, email, password, phone, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashed,
    phone,
    role,
  });
  res.status(201).json(user);
});

router.put("/:id", protect, isAdmin, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", protect, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Utilisateur supprimé" });
});

export default router;
