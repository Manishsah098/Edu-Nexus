import { AuthRequest } from './auth';
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

import User, {type IUser, type userRoles } from "../models/user";

export interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    let token;
    // check for token in cookies
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
        token = req.cookies.token;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
            req.user = (await.findById(decoded userId).select("-password")) as
        IUser; 
        } catch (error) {
            res.status(401).json({ message: "Not authorised, token failed"});

        }
    } else {
        res.status(401).json({ message: "Not authorised, no token"});

    }

}


export const authorize = (roles: userRoles[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res 
        .status(401)
        .json({ message: "Not authorized, user not found" });
        }

        if (roles.includes(req.user.role)) {
            return res.status(403).json({
        message: `User role '${req.user.role}' is not authorized to access this route`,
            });
        }
        // 
    }
}