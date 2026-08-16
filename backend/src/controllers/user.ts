import { type Request, type Response } from "express";
import user from "../models/user.ts";


// @desc   Register a new user
// @routhe post /api/users/register
//@access private (Admin & Teacher)
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const{
            name, email, password, role, isActive, studentClass, teacherSubject 
        } = req.body;

        //check if user is alreaady exists
        const existingUser = await user.findOne({ email});

        if(existingUser) {
            res.status(400).json({ message: "User already exists"});
            return;
        }

        //create user
        const newUser = new user({
            name,
            email,
            password,
            role,
            studentClass,
            teacherSubject,

        })

        if(newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isActive: newUser.isActive,
                studentClass: newUser.studentClass,
                teacherSubject: newUser.teacherSubject,
                message: "User created successfully"
            })
            
        }else {
            res.status (400).json({ message: "Invalid user data"});
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
 };


 // @desc   Register a new user
// @routhe post /api/users/
//@access private (Admin & Teacher)