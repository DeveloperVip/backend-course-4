import Question from "../../models/question.model.js";

const createQuestion = async (userId, data) => {
    try {
      console.log("🚀 ~ createQuestion ~ userId:", userId);
      const newQuestionData = {
        userId: userId,
        ...data 
      };
      const newQuestion = await Question.create(newQuestionData);
      
      return newQuestion;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error; 
    }
  };
const updateQuestion = async(id,data)=>{
    const updateQuestion =await Question.findByIdAndUpdate(id,data);
    return updateQuestion;
}

const getQuestion = async(id)=>{
    const question = await Question.findById(id);
    return question
}

const deleteQuestion = async(id)=>{
    const deleted = await Question.findByIdAndDelete(id);
    return deleted;
}

export {createQuestion,updateQuestion,deleteQuestion,getQuestion}
