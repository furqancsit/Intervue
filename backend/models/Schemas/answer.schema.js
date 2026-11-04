import mongoose, { Schema }  from "mongoose"

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    answer: {
      type: String,
      default: "",
    },

    durationSeconds: {
      type: Number,
      min: 0,
      default: 0,
    },

    answeredAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false },
);


export default answerSchema