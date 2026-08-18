import { resolve } from "node:dns";
import { ActivitiesLog } from "../models/activitieslog";

export const logActivity = async(
    userId: string,
    action: String,
    details: String
) => {
    try {
        await ActivitiesLog.create({
            user: userId;
            action,
            details, 
        });

    } catch (error) {
        console.error("Failed to log activity:", error);
        res.status(500).json({message: "Internal serval error"});


    }
};