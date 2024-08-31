import express from "express";
import {
    createQuizController,
    getQuizByIdController,
    getAllQuizzesController,
    updateQuizController,
    deleteQuizController
} from "../controllers/quiz.controller.js";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";

const quizRouter = express.Router();

quizRouter.post("/create",tokenMiddleware, createQuizController);
quizRouter.get("/get/:id", getQuizByIdController);
quizRouter.get("/get", getAllQuizzesController);
quizRouter.put("/update/:id",tokenMiddleware,updateQuizController);
quizRouter.delete("/delete:id", deleteQuizController);

export default quizRouter;
