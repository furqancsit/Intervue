import mongoose from "mongoose"
const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["technical", "behavioral", "situational"],
      default: "technical",
    },

    topic: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    order: {
      type: Number,
      required: true,
    },
  },
  { _id: true },
);


export default questionSchema