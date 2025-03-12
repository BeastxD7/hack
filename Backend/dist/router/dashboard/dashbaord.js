"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Only doctors can access this route
router.get("/doctor/dashboard", (0, authMiddleware_1.default)("doctor"), (req, res) => {
    res.json({ message: `Welcome, Dr. ${req.user.name}` });
});
// Only patients can access this route
router.get("/patient/dashboard", (0, authMiddleware_1.default)("patient"), (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});
// Admin route
router.get("/admin", (0, authMiddleware_1.default)("admin"), (req, res) => {
    res.json({ message: `Admin control center` });
});
module.exports = router;
