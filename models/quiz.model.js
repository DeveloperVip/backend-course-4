import mongoose from "mongoose";
const schema = mongoose.Schema;
const quizSchema = new schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  name: { type: String },
  image: { type: String },
  topic: { type: mongoose.Types.ObjectId, ref: "topic" },
  grade: { name: { type: String }, description: { type: String } },
  question: [{ type: mongoose.Types.ObjectId, ref: "question" }],
  point: { type: Number },
  time: { type: Number },
});

const Quiz = mongoose.model("quiz", quizSchema);
export default Quiz;
