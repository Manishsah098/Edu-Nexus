import { type Request, type Response } from "express";
import user from "../models/user.ts";
import { generateToken } from "../utils/generateToken.ts";
import { logActivity } from "../utils/activitieslog.ts";

// @desc   Register a new user
// @route  POST /api/users/register
// @access private (Admin & Teacher)
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            name, email, password, role, isActive, studentClass, teacherSubject
        } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email and password are required" });
            return;
        }

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
            isActive,
            studentClass,
            teacherSubject,
        });

        await newUser.save();

        if ((req as any).user) {
            await logActivity(
                (req as any).user._id,
                "Registered User",
                `Registered user with email: ${newUser.email} and role: ${newUser.role}`
            );
        }

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

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        const foundUser = await user.findOne({ email }).select("+password");

        if (foundUser && (await foundUser.matchPassword(password))) {
            const token = generateToken(foundUser.id.toString());

            // If generateToken no longer sets the cookie internally,
            // uncomment and adjust this line:
            // res.cookie("jwt", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });

            res.json({
                _id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
                isActive: foundUser.isActive,
                studentClass: foundUser.studentClass,
                teacherSubject: foundUser.teacherSubject,
                token, // remove this if you're only using a cookie
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};