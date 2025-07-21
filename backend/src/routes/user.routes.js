"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/me", auth_1.protect, async (req, res) => {
    const user = await User_1.default.findById(req.user.id).select("-password");
    res.json(user);
});
router.get("/", auth_1.protect, auth_1.isAdmin, async (_req, res) => {
    const users = await User_1.default.find().select("-password");
    res.json(users);
});
router.post("/", auth_1.protect, auth_1.isAdmin, async (req, res) => {
    const { username, email, password, phone, role } = req.body;
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.default.create({
        username,
        email,
        password: hashed,
        phone,
        role,
    });
    res.status(201).json(user);
});
router.put("/:id", auth_1.protect, auth_1.isAdmin, async (req, res) => {
    const updated = await User_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updated);
});
router.delete("/:id", auth_1.protect, auth_1.isAdmin, async (req, res) => {
    await User_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
});
exports.default = router;
