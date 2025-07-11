// app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Import routes
import userRouter from "./routes/user_routes.js"; // ✅ default import

// ✅ Mount routes
app.use("/api/v1/users", userRouter);

export { app };
