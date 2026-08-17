import { type Request, type Response } from "express";
import user from "../models/user.ts";
import { generateToken } from "../utils/generateToken.ts";

// @desc   Register a new user
// @route  POST /api/users/register
// @access private (Admin & Teacher)
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name, email, password, role, isActive, studentClass, teacherSubject
        } = req.body;

        const existingUser = await user.findOne({ email });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const newUser = new user({
            name,
            email,
            password,
            role,
            studentClass,
            teacherSubject,
        });

        await newUser.save();

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isActive: newUser.isActive,
                studentClass: newUser.studentClass,
                teacherSubject: newUser.teacherSubject,
                message: "User created successfully"
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
 };

 
// @desc   Login user
// @route  POST /api/users/login
// @access public
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const foundUser = await user.findOne({ email }).select("+password");

        if (foundUser && (await foundUser.matchPassword(password))) {
            generateToken(foundUser.id.toString(), res);
            res.json(foundUser);
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

   } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
 };
