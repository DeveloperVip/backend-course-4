import {
    createTopic,
    getTopicById,
    getAllTopics,
    updateTopic,
    deleteTopic
} from "../services/topic.service/curd.topic.js";


const createTopicController = async (req, res) => {
    try {
        const topic = await createTopic(req.body);
        res.status(201).json(topic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTopicByIdController = async (req, res) => {
    try {
        const topic = await getTopicById(req.params.id);
        if (topic) {
            res.status(200).json(topic);
        } else {
            res.status(404).json({ message: "Topic not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllTopicsController = async (req, res) => {
    try {
        const topics = await getAllTopics();
        res.status(200).json(topics);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTopicController = async (req, res) => {
    try {
        const updatedTopic = await updateTopic(req.params.id, req.body);
        if (updatedTopic) {
            res.status(200).json(updatedTopic);
        } else {
            res.status(404).json({ message: "Topic not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTopicController = async (req, res) => {
    try {
        await deleteTopic(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    createTopicController,
    getTopicByIdController,
    getAllTopicsController,
    updateTopicController,
    deleteTopicController
};
