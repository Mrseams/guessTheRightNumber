"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get("/", auth_1.protect, async (req, res) => {
    const user = await User_1.default.findById(req.user.id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ balance: user.balance });
});
exports.default = router;
