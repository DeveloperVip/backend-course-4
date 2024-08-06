import { createQuestion, deleteQuestion, getQuestion, updateQuestion } from "../services/question.service/create.question.js";
import { getResponseData } from "../utils/respone.js";

const createQuestionController = async (req, res) => {
    const newQuestion = await createQuestion(req.user.userId, req.body);
    const response = getResponseData({
        data: newQuestion,
        status: true,
        message: "Create question success",
    });
    res.status(200).json(response);
};

const updateQuestionController = async (req, res) => {
    const id = req.params.id;
    const newQuestion = await updateQuestion(id, req.body);
    const response = getResponseData({
        data: newQuestion,
        status: true,
        message: "Update question success",
    });
    res.status(200).json(response);
};

const getQuestionController = async (req, res) => {
    const questions = await getQuestion();
    const response = getResponseData({
        data: questions,
        status: true,
        message: "Fetch questions success",
    });
    res.status(200).json(response);
};

const deleteQuestionController = async (req, res) => {
    const id = req.params.id;
    const deleted = await deleteQuestion(id);
    const response = getResponseData({
        data: deleted,
        status: true,
        message: "Deleted question success",
    });
    res.status(200).json(response);
};

export {
    createQuestionController,
    updateQuestionController,
    getQuestionController,
    deleteQuestionController
};
