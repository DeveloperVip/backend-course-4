import mongoose from "mongoose";
const schema = mongoose.Schema;
const topicSchema = new schema({
  image: String,
  name: String,
  description: String,
});

const Topic = mongoose.model("topic", topicSchema);
export default Topic;
