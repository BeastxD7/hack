import { Request, Response , RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

 const registerDoctor:RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, specialization, licenseNumber } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new doctor
    const newDoctor = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      specialization,
      licenseNumber,
      status: "pendingApproval",
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registration pending approval!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default registerDoctor;