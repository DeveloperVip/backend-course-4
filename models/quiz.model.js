import mongoose from "mongoose";
const schema = mongoose.Schema;
const quizSchema = new schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  topic: { type: mongoose.Types.ObjectId, ref: "topic" },
  grade: { type: String },
  question: [{ type: mongoose.Types.ObjectId, ref: "question" }],
  point: { type: Number },
  time: { type: Number },
});

const Quiz = mongoose.model("quiz", quizSchema);
export default Quiz;
