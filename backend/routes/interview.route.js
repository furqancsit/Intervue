
import { Router } from "express";
import {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} from "../controllers/interview.controller.js";
import { protect } from "../middlewares/auth.midlleware.js";


const router = Router();


router.use(protect);

router.post("/", createInterview);
router.get("/", getInterviews);
router.get("/:id", getInterviewById);
router.patch("/:id", updateInterview);
router.delete("/:id", deleteInterview);

export default router;
