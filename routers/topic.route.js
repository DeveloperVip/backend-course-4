import express from "express";
import {
    createTopicController,
    getTopicByIdController,
    getAllTopicsController,
    updateTopicController,
    deleteTopicController
} from "../controllers/topic.controller.js";

const topicRouter = express.Router();

topicRouter.post("/create", createTopicController);
topicRouter.get("/get:id", getTopicByIdController);
topicRouter.get("/", getAllTopicsController);
topicRouter.put("/update:id", updateTopicController);
topicRouter.delete("/delete:id", deleteTopicController);

export default topicRouter;
