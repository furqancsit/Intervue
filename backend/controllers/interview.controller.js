
import mongoose from "mongoose";
import Interview from "../models/interview.model.js";
import { InterviewSession } from "../models/interviewSessions.model.js";
import { getInterviewUsage } from "../utils/getInterviewUsage.js";
import User from "../models/user.model.js";


 const createInterview = async (req, res) => {
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
      
    } = req.body;

    if (!title?.trim() || !role?.trim() || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: "Title, role, and experience level are required",
      });
    }
     const user = await User.findById(req.userId);


    const usage = await getInterviewUsage(user)


    if (!usage.canCreate) {
      return res.status(403).json({
        success: false,
        code: "INTERVIEW_LIMIT_REACHED",
        message: `Your ${usage.plan} plan allows ${usage.limit} interview(s).`,
        data: {
          plan: usage.plan,
          limit: usage.limit,
          used: usage.used,
          remaining: usage.remaining,
        },
      });
    }


    const interview = await Interview.create({
      user:req.userId,
      title: title.trim(),
      role: role.trim(),
      experienceLevel,
      topics,
      difficulty,
      questionCount,
      durationMinutes,
      interviewType,
      

    })
  ;

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      data: interview,
    });
  } catch (error) {
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
  }
};


const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.userId,
      status: "active",
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

    const latestSessionMap = new Map();

    for (const session of sessions) {
      const id = session.interview.toString();

      if (!latestSessionMap.has(id)) {
        latestSessionMap.set(id, session);
      }
    }

    const data = interviews.map((interview) => ({
      ...interview,
      latestSession:
        latestSessionMap.get(interview._id.toString()) || null,
    }));

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
      user: req.userId || req.userId,
      status: "active",
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: interview,
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


export { createInterview, getInterviews, getInterviewById, updateInterview, deleteInterview };