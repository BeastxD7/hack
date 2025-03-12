"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use("/patient", patientRoutes_1.default);
app.use("/doctor", doctorRoutes_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB connection error:", err));
app.listen(3000, () => console.log("Server running on port 3000 🚀"));
