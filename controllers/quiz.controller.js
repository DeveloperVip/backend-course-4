import {
    createQuiz,
    getQuizById,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz
} from "../services/quiz.service/crud.quiz.js";

const createQuizController = async (req, res) => {
    
    try {console.log("🚀 ~ createQuizController ~ req:", req.body)
        const userId = req.user.userId
        const quiz = await createQuiz(req.body,userId);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getQuizByIdController = async (req, res) => {
    try {
        console.log("🚀 ~ getQuizByIdController ~ req.params.id:", req.params.id)
        const quiz = await getQuizById(req.params.id);
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllQuizzesController = async (req, res) => {
    console.log("🚀 ~ getAllQuizzesController ~ req:", req.body)
    try {
        const quizzes = await getAllQuizzes();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateQuizController = async (req, res) => {
    try {
        const updatedQuiz = await updateQuiz(req.params.id, req.body);
        if (updatedQuiz) {
            res.status(200).json(updatedQuiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteQuizController = async (req, res) => {
    try {
        await deleteQuiz(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    createQuizController,
    getQuizByIdController,
    getAllQuizzesController,
    updateQuizController,
    deleteQuizController
};
