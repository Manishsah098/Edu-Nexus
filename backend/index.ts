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

// global error handler middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
});

// connect to db
const connectDB = async () => {
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

// Connect to DB FIRST, then start listening
connectDB().then(() => {
  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server is running on http://127.0.0.1:${port}`);
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${port} is already in use. Close whatever is using it, or change PORT in .env.`);
    } else if (err.code === "EACCES") {
      console.error(`❌ Permission denied to bind to port ${port}.`);
    } else {
      console.error("❌ Server failed to start:", err);
    }
    process.exit(1);
  });
});

// Catch anything that slips through unhandled
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});