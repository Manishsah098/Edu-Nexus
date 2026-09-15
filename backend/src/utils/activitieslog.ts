import { ActivitiesLog } from "../models/activitieslog";

export const logActivity = async (
    userId: string,
    action: string,
    details: string
) => {
    try {
        await ActivitiesLog.create({
            user: userId,
            action,
            details,
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
};