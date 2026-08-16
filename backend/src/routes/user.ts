import express from "express";
const userRoutes = express.Router()

import { registerUser } from "../controllers/user.ts";

userRoutes.post("/register", registerUser);

export default userRoutes;
