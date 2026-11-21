
import { Router } from "express";
import {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  startInterview,
} from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.midleware.js";
import { startInterviewLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.use(protect);

router.post("/create", protect ,createInterview);
router.post("/:interviewId/sessions", protect, startInterviewLimiter, startInterview)
router.get("/get", getInterviews);
router.get("/:id", protect, getInterviewById);
router.patch("/update/:id", updateInterview);
router.delete("/delete/:id", deleteInterview);



export default router;
