import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.route.js";
import sessionRoutes from "./routes/session.route.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/interview", interviewRoutes);
app.use("/api/v1/session", sessionRoutes);

await connectDB();
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
