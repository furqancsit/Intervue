import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
    },

    extractedText: {
      type: String,
      required: true,
    },

    skills: [String],
    experience: [
      {
        company: {
          type: String,
          default: "",
        },
        position: {
          type: String,
          default: "",
        },
        duration: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],

    projects: [
      {
        name: String,
        description: String,
        technologies: [String],
      },
    ],

    experienceLevel: {
      type: String,
      default: "",
    },

    suggestedRole: {
      type: String,
      default: "",
    },
    analysisStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Resume =  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;
