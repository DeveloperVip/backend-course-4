import Topic from "../../models/topic.model.js";

const createTopic = async (data) => {
  try {
      const newTopic = new Topic(data);
      await newTopic.save();
      return newTopic;
  } catch (error) {
      throw new Error("Error creating topic: " + error.message);
  }
};

const getTopicById = async (id) => {
  try {
      const topic = await Topic.findById(id);
      return topic;
  } catch (error) {
      throw new Error("Error getting topic: " + error.message);
  }
};

const getAllTopics = async () => {
  try {
      const topics = await Topic.find();
      return topics;
  } catch (error) {
      throw new Error("Error getting topics: " + error.message);
  }
};

const updateTopic = async (id, data) => {
  try {
      const updatedTopic = await Topic.findByIdAndUpdate(id, data, { new: true });
      return updatedTopic;
  } catch (error) {
      throw new Error("Error updating topic: " + error.message);
  }
};

const deleteTopic = async (id) => {
  try {
      await Topic.findByIdAndDelete(id);
  } catch (error) {
      throw new Error("Error deleting topic: " + error.message);
  }
};

export {
  createTopic,
  getTopicById,
  getAllTopics,
  updateTopic,
  deleteTopic
};