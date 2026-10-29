import express from "express"
import connectDB from "./config/db.js";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB()
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});