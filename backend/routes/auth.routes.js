import { Router } from "express";
import { protect } from "../middlewares/auth.midlleware.js";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";


const route = Router();

route.post("/register", registerLimiter, register);
route.post("/login", loginLimiter, login);
route.get("/me", protect, getMe);
route.post("/logout", logout);


export default route