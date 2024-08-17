import mongoose from "mongoose";
const schema = mongoose.Schema;
const historySchema = new schema({
  userID: { type: schema.Types.ObjectId, ref: "user" },
  quiz: { type: schema.Types.ObjectId, ref: "quiz" },
  point: { type: Number },
  time: { type: Number },
  date: { type: Date },
});
const History = mongoose.model("history", historySchema);
export default History;
