import express from "express";
const userRoutes = express.Router()

import { register, login } from "../controllers/user.ts";
import {protect, } from "../middleware/auth";


// make sure to protect to get access to the user token
userRoutes.post("/register",protect, authorize(["admin", "teacher"]), register);
userRoutes.post("/login", login);

export default userRoutes;

//next we protect routes, also add rolebased access
