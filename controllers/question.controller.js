import { createQuestion, deleteQuestion, getQuestion, updateQuestion } from "../services/question.service/create.question.js";
import { fileDestroy } from "../services/upload.service/file.destroy.js";
import { updateImageQuestion, uploadImageQuestion } from "../services/upload.service/image.question.js";
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

const uploadImageQuestionController = async(req,res)=>{
    const image = req.file;
    if (!image) {
        const response = getResponseData({
            data: null,
            status: false,
            message: "Không có tệp được tải lên.",
        });
        res.status(400).json(response);
    } else {
        const uploadedImage = await uploadImageQuestion(image);
        const response = getResponseData({
            data: uploadedImage,
            status: true,
            message: "Upload image question success",
        });
        res.status(200).json(response);
    }
};

const updateImageQuestionController = async (req, res) => {
    const image = req.file;
    const public_id = req.body.public_id;
    const questionId = req.params.id;
    if (!image) {
        const response = getResponseData({
            data: null,
            status: false,
            message: "Không có tệp được tải lên.",
        });
        res.status(400).json(response);
    } else {
        await fileDestroy(public_id);
        const updatedImage = await updateImageQuestion(image, questionId);
        const response = getResponseData({
            data: updatedImage,
            status: true,
            message: "Upload image question success",
        });
        res.status(200).json(response);
    }
};
export {
    createQuestionController,
    updateQuestionController,
    getQuestionController,
    deleteQuestionController,
    updateImageQuestionController,
    uploadImageQuestionController
};
