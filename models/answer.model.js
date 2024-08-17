import mongoose from "mongoose";
const schema = mongoose.Schema;
const answerSchema = new schema({
  content: { type: String },
  relatedPictures: {
    public_id: { type: String },
    secure_url: {
      type: String,
    },
  },
});

const Answer = mongoose.model("answer", answerSchema);
export default Answer;
