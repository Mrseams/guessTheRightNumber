"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const router = express_1.default.Router();
router.post("/register", async (req, res) => {
    const { username, email, password, phone } = req.body;
    const existing = await User_1.default.findOne({ email });
    if (existing)
        return res.status(400).json({ message: "Email already used" });
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.default.create({ username, email, password: hashed, phone });
    res.status(201).json({ message: "Registered", user });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        return res.status(401).json({ message: "Wrong password" });
    const token = (0, jwt_1.generateToken)(user);
    res.json({
        token,
        user: { id: user._id, username: user.username, role: user.role },
    });
});
exports.default = router;
