import express from "express";
import {
    createQuizController,
    getQuizByIdController,
    getAllQuizzesController,
    updateQuizController,
    deleteQuizController
} from "../controllers/quiz.controller.js";

const quizRouter = express.Router();

quizRouter.post("/", createQuizController);
quizRouter.get("/:id", getQuizByIdController);
quizRouter.get("/", getAllQuizzesController);
quizRouter.put("/:id", updateQuizController);
quizRouter.delete("/:id", deleteQuizController);

export default quizRouter;
