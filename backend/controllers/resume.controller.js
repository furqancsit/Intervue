import { analyzeResume } from "../services/resumeAnalysis.service.js";
import Resume from "../models/Resume.model.js";
export const analyzeResumeController = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.userId
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }

   if (!resume.extractedText?.trim()) {
  return res.status(400).json({
    success: false,
    message: "Resume text is not available"
  });
}

// NEW CHECK
if (resume.analysisStatus === "completed") {
 
  return res.status(200).json({
    success: true,
    message: "Resume already analyzed",
    data: resume,
  });
}

// Run AI analysis
const analysis = await analyzeResume(resume.extractedText);
const updatedResume = await Resume.findOneAndUpdate(
      {
        _id: resumeId,
        user: req.userId,
      },
      {
        $set: {
          skills: analysis.skills,
          experience: analysis.experience,
          projects: analysis.projects,
          suggestedRole: analysis.suggestedRole,
          experienceLevel: analysis.experienceLevel,
          analysisStatus: "completed",
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found during update",
      });
    }

    // 5. Return updated resume
    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: updatedResume,
    });

  } catch (error) {
    console.error("Resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
    });
  }
};

export const getResumeAnalysisController = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.userId,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: resume,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume analysis",
    });
  }
};