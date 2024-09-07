import mongoose from "mongoose";
const schema = mongoose.Schema;
const historySchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "user" },
  quiz: { type: schema.Types.ObjectId, ref: "quiz" },
  correctAnswer: { type: Number },
  wrongAnswer: { type: Number },
  allAnswersSelected: [{ type: mongoose.Types.ObjectId, ref: "answer" }],
  point: { type: Number },
  time: { type: Number },
  date: { type: Date },
});
const History = mongoose.model("history", historySchema);
export default History;
