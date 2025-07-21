"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/history.routes.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const Game_1 = __importDefault(require("../models/Game"));
const router = express_1.default.Router();
router.get("/", auth_1.protect, async (req, res) => {
    const games = await Game_1.default.find({ user: req.user.id }).sort({ date: -1 });
    res.json(games);
});
router.get("/all", auth_1.protect, auth_1.isAdmin, async (_req, res) => {
    const games = await Game_1.default.find()
        .populate("user", "username email")
        .sort({ date: -1 });
    res.json(games);
});
exports.default = router;
