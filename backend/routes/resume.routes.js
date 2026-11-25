import express from "express";

import { protect } from "../middlewares/auth.midleware.js";
import { uploadResume } from "../middlewares/upload.middleware.js";
import { uploadResumeController } from "../controllers/uplaodResume.controller.js";
import { analyzeResumeController, getResumeAnalysisController } from "../controllers/resume.controller.js";


const router = express.Router();

router.post("/:resumeId/analyze", protect, analyzeResumeController);
router.get(
  "/:resumeId",
  protect,
  getResumeAnalysisController
);

router.post("/upload", protect, uploadResume, uploadResumeController);
export default router;
