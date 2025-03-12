"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const registerDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, specialization, licenseNumber } = req.body;
        // Check if email already exists
        const existingUser = yield userModel_js_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Save the new doctor
        const newDoctor = new userModel_js_1.default({
            name,
            email,
            password: hashedPassword,
            role: "doctor",
            specialization,
            licenseNumber,
            status: "pendingApproval",
        });
        yield newDoctor.save();
        res.status(201).json({ message: "Doctor registration pending approval!" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = registerDoctor;
