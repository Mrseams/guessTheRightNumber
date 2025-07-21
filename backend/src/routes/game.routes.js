"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const Game_1 = __importDefault(require("../models/Game"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.post("/play", auth_1.protect, async (req, res) => {
    const number = Math.floor(Math.random() * 101);
    const result = number > 70 ? "gagné" : "perdu";
    const balanceChange = result === "gagné" ? 50 : -35;
    const user = await User_1.default.findById(req.user.id);
    if (!user)
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    user.balance += balanceChange;
    await user.save();
    await Game_1.default.create({
        user: user._id,
        generatedNumber: number,
        result,
        balanceChange,
        newBalance: user.balance,
    });
    res.json({ result, generatedNumber: number, newBalance: user.balance });
});
exports.default = router;
