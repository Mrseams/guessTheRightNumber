import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, phone } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already used" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed, phone });
  res.status(201).json({ message: "Registered", user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password!);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = generateToken(user);
  res.json({
    token,
    user: { id: user._id, username: user.username, role: user.role },
  });
});

export default router;
