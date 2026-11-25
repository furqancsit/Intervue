import mongoose from "mongoose";
import Interview from "../models/interview.model.js";

import InterviewSession from "../models/InterviewSession.js";
import User from "../models/user.model.js";
import { generateInterviewQuestions } from "../utils/generateInterviewQuestion.js";
import Resume from "../models/resume.model.js";
const PLAN_LIMITS = {
  free: 1,
  paid: 5,
};
const createInterview = async (req, res) => {
  let session;

  try {
    const {
      title,
      role,
      experienceLevel,
      topics,
      difficulty,
      questionCount,
      durationMinutes,
      interviewType,
      resumeId,
    } = req.body;

    // 1. Validate resume
    let resume = null;

    if (resumeId) {
      resume = await Resume.findOne({
        _id: resumeId,
        user: req.userId,
        analysisStatus: "completed",
      });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Analyzed resume not found",
        });
      }
    }

    // 2. Validate required fields
    if (!title?.trim() || !role?.trim() || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: "Title, role, and experience level are required",
      });
    }

    if (
      !Number.isInteger(questionCount) ||
      questionCount < 1 ||
      questionCount > 20
    ) {
      return res.status(400).json({
        success: false,
        message: "Question count must be between 1 and 20",
      });
    }

    // 3. Start MongoDB transaction
    session = await mongoose.startSession();

    let interview;
    let usage;

    await session.withTransaction(async () => {
      // 4. Get user
      const user = await User.findById(req.userId)
        .select("plan")
        .session(session);

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      // 5. Get plan limit
      const plan = user.plan ?? "free";
      const limit = PLAN_LIMITS[plan];

      if (limit === undefined) {
        throw new Error("INVALID_USER_PLAN");
      }

      // 6. Atomically reserve one interview slot
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.userId,
          plan,
          interviewUsage: { $lt: limit },
        },
        {
          $inc: { interviewUsage: 1 },
        },
        {
          new: true,
          session,
        },
      );

      // No available slot
      if (!updatedUser) {
        throw new Error("INTERVIEW_LIMIT_REACHED");
      }

      usage = {
        plan,
        limit,
        used: updatedUser.interviewUsage,
        remaining: limit - updatedUser.interviewUsage,
      };

      // 7. Create interview in the same transaction
      const [createdInterview] = await Interview.create(
        [
          {
            user: req.userId,
            title: title.trim(),
            role: role.trim(),
            experienceLevel,
            topics,
            difficulty,
            questionCount,
            durationMinutes,
            interviewType,
            resume: resume?._id || null,
          },
        ],
        { session },
      );

      interview = createdInterview;
    });

    // 8. Transaction successfully committed
    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      data: interview,
      usage,
    });
  } catch (error) {
    if (error.message === "INTERVIEW_LIMIT_REACHED") {
      return res.status(403).json({
        success: false,
        code: "INTERVIEW_LIMIT_REACHED",
        message: "You have reached your interview limit.",
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create interview",
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

const startInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await Interview.findOne({
      _id: interviewId,
      user: req.userId,
    });
    if (!interview) {
      return res
        .status(404)
        .json({ success: false, message: "interview not found" });
    }

    const completedSession = await InterviewSession.findOne({
      user: req.userId,
      interview: interview._id,
      status: "completed",
    }).sort({ startedAt: -1 });

    if (completedSession) {
      return res.status(403).json({
        success: false,
        message: "This interview has already been completed.",
        data: {
          sessionId: completedSession._id,
          status: completedSession.status,
        },
      });
    }

    const existingSession = await InterviewSession.findOne({
      user: req.userId,
      interview: interview?._id,
      status: "in_progress",
    }).sort({ startedAt: -1 });

    if (existingSession) {
      return res.status(200).json({
        success: true,
        message: "Exsiting interview session resumed",
        data: {
          sessionId: existingSession._id,
          interviewId: interview._id,
          title: interview.title,
          role: interview.role,
          durationMinutes: interview.durationMinutes,
          totalQuestions: existingSession.questions.length,
          questions: existingSession.questions,
          answers: existingSession.answers,
          status: existingSession.status,
        },
      });
    }
    let resumeAnalysis = null;

    if (interview.resume) {
      const resume = await Resume.findOne({
        _id: interview.resume,
        user: req.userId,
        analysisStatus: "completed",
      });

      if (!resume) {
        return res.status(404).json({
          success: false,
          message: "Resume analysis not found",
        });
      }

      resumeAnalysis = {
        skills: resume.skills,
        experience: resume.experience,
        projects: resume.projects,
        suggestedRole: resume.suggestedRole,
        experienceLevel: resume.experienceLevel,
      };
    }

    const questions = await generateInterviewQuestions(
      {
        role: interview.role,
        difficulty: interview.difficulty,
        topics: interview.topics,
        questionCount: interview.questionCount,
        type: interview.interviewType,
      },
      resumeAnalysis,
    );

    const session = await InterviewSession.create({
      user: req.userId,
      interview: interview._id,
      questions: questions,
      answer: [],
      status: "in_progress",
    });

    return res.status(201).json({
      success: true,
      message: "Interview session started successfully",
      data: {
        sessionId: session._id,
        interviewId: interview._id,
        title: interview.title,
        role: interview.role,
        durationMinutes: interview.durationMinutes,
        totalQuestions: session.questions.length,
        questions: session.questions,
        answers: session.answers,
        status: session.status,
      },
    });
  } catch (error) {
    console.error("Start interview session error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to start interview session",
    });
  }
};

// session exist
// if not then create
// if yes then continue saw progress or status
// const getInterviews = async (req, res) => {
//   try {
//     const interviews = await Interview.find({
//       user: req.userId,
//       status: "active",
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     const interviewIds = interviews.map((item) => item._id);

//     const sessions = interviewIds.length
//       ? await InterviewSession.find({
//           user: req.userId,
//           interview: { $in: interviewIds },
//         })
//           .sort({ createdAt: -1 })
//           .lean()
//       : [];

//     const latestSessionMap = new Map();

//     for (const session of sessions) {
//       const id = session.interview.toString();

//       if (!latestSessionMap.has(id)) {
//         latestSessionMap.set(id, session);
//       }
//     }

//     const data = interviews.map((interview) => ({
//       ...interview,
//       latestSession: latestSessionMap.get(interview._id.toString()) || null,
//     }));

//     return res.status(200).json({
//       success: true,
//       count: data.length,
//       data,
//     });
//   } catch (error) {
//     console.error("Get interviews error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch interviews",
//     });
//   }
// };

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.userId,
      status: "active", // Interview configuration status
    })
      .sort({ createdAt: -1 })
      .lean();

    const interviewIds = interviews.map((item) => item._id);

    const sessions = interviewIds.length
      ? await InterviewSession.find({
          user: req.userId,
          interview: { $in: interviewIds },
        })
          .sort({ createdAt: -1 })
          .lean()
      : [];

    // Get the latest session for each interview
    const latestSessionMap = new Map();

    for (const session of sessions) {
      const id = session.interview.toString();

      if (!latestSessionMap.has(id)) {
        latestSessionMap.set(id, session);
      }
    }

    const data = interviews.map((interview) => {
      const latestSession = latestSessionMap.get(interview._id.toString());

      return {
        ...interview,

        // Session information
        sessionId: latestSession?._id || null,
        sessionStatus: latestSession?.status || "not_started",
        questions: latestSession?.questions || [],
        answers: latestSession?.answers || [],
        mode: latestSession?.mode || null,
        evaluation: latestSession?.evaluation || null,
      };
    });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Get interviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interviews",
    });
  }
};

const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const interview = await Interview.findOne({
      _id: id,
      user: req.userId,
      status: "active",
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    // Fetch the latest in-progress session
    const session = await InterviewSession.findOne({
      interview: interview._id,
      user: req.userId,
      status: "in_progress",
    }).sort({ startedAt: -1 });

    return res.status(200).json({
      success: true,
      data: {
        ...interview.toObject(),
        sessionId: session?._id || null,
        questions: session?.questions || [],
        answers: session?.answers || [],
        sessionStatus: session?.status || null,
      },
    });
  } catch (error) {
    console.error("Get interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview",
    });
  }
};

const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    // Only allow these fields to be updated
    const allowedFields = [
      "title",
      "role",
      "experienceLevel",
      "topics",
      "difficulty",
      "questionCount",
      "durationMinutes",
      "interviewType",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    if (typeof updates.title === "string" && !updates.title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty",
      });
    }

    if (typeof updates.role === "string" && !updates.role.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role cannot be empty",
      });
    }

    if (updates.title) {
      updates.title = updates.title.trim();
    }

    if (updates.role) {
      updates.role = updates.role.trim();
    }

    const interview = await Interview.findOneAndUpdate(
      {
        _id: id,
        user: req.userId || req.userId,
        status: "active",
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      data: interview,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update interview",
    });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    // Soft delete: preserve interview history
    const interview = await Interview.findOneAndUpdate(
      {
        _id: id,
        user: req.userId,
        status: "active",
      },
      {
        $set: { status: "archived" },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview archived successfully",
    });
  } catch (error) {
    console.error("Archive interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to archive interview",
    });
  }
};

export {
  createInterview,
  startInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
};
