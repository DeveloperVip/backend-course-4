import express from "express";
import {
    createTopicController,
    getTopicByIdController,
    getAllTopicsController,
    updateTopicController,
    deleteTopicController
} from "../controllers/topic.controller";

const topicRouter = express.Router();

topicRouter.post("/", createTopicController);
topicRouter.get("/:id", getTopicByIdController);
topicRouter.get("/", getAllTopicsController);
topicRouter.put("/:id", updateTopicController);
topicRouter.delete("/:id", deleteTopicController);

export default topicRouter;
