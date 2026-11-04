import { model, Schema } from "mongoose";
import answerSchema from "./Schemas/answer.schema.js";
import questionSchema from "./Schemas/question.schema.js";
import evaluationSchema from "./Schemas/evaluationSchema.js";
const interviewSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    interview: {
      type: Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
      index: true,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    answers: {
      type: [answerSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["in_progress", "completed", "abandoned"],
      default: "in_progress",
      index: true,
    },
    
    mode: {
      type: String,
      enum: ["text", "voice"],
      default: "text",
    },

    conversationTurns: {
      type: [], //vomvrdstion schema
      default: [],
    },
    
    evaluation: {
      type: evaluationSchema,
      default: null,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);


 const InterviewSession = model("interviewSession", interviewSessionSchema)

 export default InterviewSession;