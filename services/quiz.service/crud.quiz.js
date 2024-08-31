import Quiz from "../../models/quiz.model.js";

const createQuiz = async (data, userId) => {
  try {
    const quizData = {
      userId: userId,
      image: data.image,
      name: data.name,
      topic: data.topic._id,
      grade: { name: data.grade.name, description: data.grade.description },
      point: data.point,
      time: data.time,
    };
    console.log("🚀 ~ createQuiz ~ quizData:", quizData);
    const newQuiz = await Quiz.create(quizData);
    console.log("🚀 ~ createQuiz ~ newQuiz:", newQuiz);
    return newQuiz;
  } catch (error) {
    throw new Error("Error creating quiz: " + error.message);
  }
};

const getQuizById = async (id) => {
  try {
    const quiz = await Quiz.findById(id)
      .populate("topic")
      .populate({
        path: 'question',
        populate: [
            { path: 'answers' },        
            { path: 'answersCorrect' }  
        ]
    })
    return quiz;
  } catch (error) {
    throw new Error("Error getting quiz: " + error.message);
  }
};

const getAllQuizzes = async () => {
  try {
    const quizzes = await Quiz.find().populate("topic").populate("question");
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

export { createQuiz, getQuizById, getAllQuizzes, updateQuiz, deleteQuiz };
