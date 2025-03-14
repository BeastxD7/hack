"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "your_secret_key");
            req.user = decoded;
            if (requiredRole && decoded.role !== requiredRole) {
                res.status(403).json({ message: "Forbidden: Access denied" });
                return;
            }
            next(); // Ensure it proceeds to the next route
        }
        catch (error) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
    };
};
exports.default = authMiddleware;
