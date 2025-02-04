import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
