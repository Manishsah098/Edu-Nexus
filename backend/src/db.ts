import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URL;
    if (!mongoUri) {
      throw new Error(
        "MongoDB connection URI is not defined in process.env (check MONGO_URI or MONGODB_URL in .env)"
      );
    }
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
