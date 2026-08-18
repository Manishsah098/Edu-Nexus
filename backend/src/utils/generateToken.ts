import jwt from "jsonwebtoken";
import { type Response} from "express";

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
        algorithm: "HS512",
    });

    res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/",
});
};

// attach token to http-only cookie
