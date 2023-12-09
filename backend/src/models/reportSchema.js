const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizzes",
  },
  attemptsCount: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  questions: [
    {
      correctAnswers: {
        type: Number,
        default: 0,
      },
      wrongAnswers: {
        type: Number,
        default: 0,
      },
    },
  ],
  achived: {
    type: String,
    enum: ["passed", "failed"],
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reportModel = mongoose.model("Reports", reportSchema);
module.exports = reportModel;
