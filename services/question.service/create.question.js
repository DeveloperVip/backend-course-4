import Question from "../../models/question.model.js";


const createQuestion = async(userId,data)=>{
    const newQuestion = Question.create({userId:userId},data)
    await newQuestion.save();
    return newQuestion
}

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
