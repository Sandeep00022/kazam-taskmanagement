import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { loginValidation, registerValidation } from "../utils/validateRequest";

export const register = async (req: Request, res: Response): Promise<void> => {
  // Validate user input
  const { error } = registerValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  if (await User.findOne({ email })) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  // Validate user input
  const { error } = loginValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};
