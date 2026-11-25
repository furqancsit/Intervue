import mongoose from "mongoose";

const { Schema, model } = mongoose;

const interviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
      lowercase: true,
      required: true,

      
    },

    topics: {
      type: [String],
      default: [],
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "mixed"],
      default: "mixed",
      lowercase: true,
    },

    questionCount: {
      type: Number,
      min: [1, "Minimum 1 question is required"],
      max: [20, "Maximum 20 questions are allowed"],
      default: 10,
      validate: {
        validator: Number.isInteger,
        message: "Question count must be an integer",
      },
    },
    durationMinutes: {
      type: Number,
      min: 5,
      max: 180,
      default: 30,
    },

    interviewType: {
      type: String,
      enum: ["technical", "behavioral", "mixed"],
      default: "technical",
      lowercase:true
    },

    status: {
      type: String,
      enum: ["active", "archived"],
       default: "active",
    },
  },
  { timestamps: true },
);

interviewSchema.index({ user: 1, createdAt: -1 });

const Interview = model("Interview", interviewSchema);

export default Interview;
