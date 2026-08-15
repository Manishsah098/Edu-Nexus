import dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";


import dns from "node:dns";

dotenv.config();

try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (dnsErr) {
  console.warn("Could not set custom DNS servers:", dnsErr);
}

const app: Application = express();

const port = Number(process.env.PORT) || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "EDUNEXUS Backend is running!",
  });
});

//global error handler middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",});
});


//connect oout db here
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URL;
    if (!mongoUri) {
      throw new Error("MongoDB connection URI is not defined in process.env (check MONGO_URI or MONGODB_URL in .env)");
    }
    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};



app.listen(port, () => {
    connectDB();
  console.log(`🚀 Server is running on port 5000`);
});