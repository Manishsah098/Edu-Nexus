import mongoose, { Schema, Document } from "mongoose";

export interface IActivityLog extends Document {
  user: string;
  action: string;
  details?: string;
  createdAt: Date;
}

const activitiesLogSchema = new Schema<IActivityLog>(
  {
    user: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ActivitiesLog = mongoose.model<IActivityLog>(
  "ActivityLog",
  activitiesLogSchema
);