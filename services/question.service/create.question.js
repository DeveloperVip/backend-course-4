import Question from "../../models/question.model.js";

const createQuestion = async (userId, data) => {
  try {
    console.log("🚀 ~ createQuestion ~ userId:", userId);
    const newQuestionData = {
      userId: userId,
      ...data,
    };
    const newQuestion = await Question.create(newQuestionData);

    return newQuestion;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

const getQuestionById = async (id) => {
  console.log("🚀 ~ getQuestionById ~ id:", id);
  try {
    const question = await Question.findById(id).populate("answers");

    return question; // Trả về câu hỏi nếu tìm thấy, nếu không trả về null
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
};

const updateQuestion = async (id, data) => {
  const updateQuestion = await Question.findByIdAndUpdate(id, data);
  return updateQuestion;
};
const getQuestion = async (userId) => {
  try {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
      {
        $lookup: {
          from: "answers",
          localField: "answers",
          foreignField: "_id",
          as: "answers",
        },
      },
      {
        $match: {
          "userId._id": userId,
        },
      },

      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ userId: "$userId" }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          "userId.password": 0, // Ẩn trường password nếu có (hoặc bất kỳ trường nào bạn muốn ẩn)
        },
      },
    ]);

    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

const deleteQuestion = async (id) => {
  const deleted = await Question.findByIdAndDelete(id);
  return deleted;
};

export {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getQuestionById,
};
