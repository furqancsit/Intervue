import { Router } from "express";
import { protect } from "../middlewares/auth.midleware.js";
import {
  submitAnswer,
  completeInterview,
} from "../controllers/interviewSeesion.interview.js";

const router = Router();

router.use(protect);
router.post("/interviews/:interviewId/sessions/:sessionId/questions/:order/answer", submitAnswer);
router.post("/:interviewId/sessions/:sessionId/complete", completeInterview);
export default router;
