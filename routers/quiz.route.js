import express from "express";
import {
    createQuizController,
    getQuizByIdController,
    getAllQuizzesController,
    updateQuizController,
    deleteQuizController
} from "../controllers/quiz.controller.js";

const quizRouter = express.Router();

quizRouter.post("/create", createQuizController);
quizRouter.get("/get:id", getQuizByIdController);
quizRouter.get("/", getAllQuizzesController);
quizRouter.put("/update:id", updateQuizController);
quizRouter.delete("/delete:id", deleteQuizController);

export default quizRouter;
