import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import patientRoutes from "./routes/patientRoutes";
import doctorRoutes from "./routes/doctorRoutes";

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB connection error:", err));

app.listen(3000, () => console.log("Server running on port 3000 🚀"));
