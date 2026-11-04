import { Schema, model } from "mongoose";

const evaluationSchema = new Schema(
  {
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    performance: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Needs Improvement"],
      default: "Average",
    },

    summary: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    improvements: {
      type: [String],
      default: [],
    },

    questionFeedback: {
      type: [], //questionFeedbackSchema
      default: [],
    },

    evaluatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);
export default evaluationSchema