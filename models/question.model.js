import mongoose from "mongoose";
const schema = mongoose.Schema;
const questionSchema = new schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  question: { type: String },
  pictureQuestion: {
    public_id: { type: String },
    secure_url: {
      type: String,
    },
  },
  answers: [{ type: mongoose.Types.ObjectId, ref: "answer" }],
  answersCorrect: [{ type: mongoose.Types.ObjectId, ref: "answer" }],
  isMultiple: { type: Boolean },
  point: { type: Number },
  time: { type: Number },
});

const Question = mongoose.model("question", questionSchema);
export default Question;
