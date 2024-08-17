import Quiz from "../../models/quiz.model.js";


const createQuiz = async (data) => {
    try {
        const newQuiz = new Quiz.create(data);
        await newQuiz.save();
        return newQuiz;
    } catch (error) {
        throw new Error("Error creating quiz: " + error.message);
    }
};

const getQuizById = async (id) => {
    try {
        const quiz = await Quiz.findById(id).populate('topic').populate('questions');
        return quiz;
    } catch (error) {
        throw new Error("Error getting quiz: " + error.message);
    }
};

const getAllQuizzes = async () => {
    try {
        const quizzes = await Quiz.find().populate('topic').populate('questions');
        return quizzes;
    } catch (error) {
        throw new Error("Error getting quizzes: " + error.message);
    }
};

const updateQuiz = async (id, data) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, data, { new: true });
        return updatedQuiz;
    } catch (error) {
        throw new Error("Error updating quiz: " + error.message);
    }
};

const deleteQuiz = async (id) => {
    try {
        await Quiz.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting quiz: " + error.message);
    }
};

export {
    createQuiz,
    getQuizById,
    getAllQuizzes,
    updateQuiz,
    deleteQuiz
};
