import { Request, Response ,RequestHandler} from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const registerPatient: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new patient
    const newPatient = new User({
      name,
      email,
      password: hashedPassword,
      role: "patient",
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default registerPatient