
import { Router } from "express";
import {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.midleware.js";

const router = Router();

router.use(protect);

router.post("/create", createInterview);
router.get("/get", getInterviews);
router.get("/:id", getInterviewById);
router.patch("/update/:id", updateInterview);
router.delete("/delete/:id", deleteInterview);

export default router;
