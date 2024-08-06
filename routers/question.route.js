import express from "express";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";
import {
    createQuestionController,
    updateQuestionController,
    getQuestionController,
    deleteQuestionController
} from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.post("/create", tokenMiddleware, createQuestionController);
questionRouter.put("/update/:id", tokenMiddleware, updateQuestionController);
questionRouter.get("/", tokenMiddleware, getQuestionController);
questionRouter.delete("/delete/:id", tokenMiddleware, deleteQuestionController);

export default questionRouter;
