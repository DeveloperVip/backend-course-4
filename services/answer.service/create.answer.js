import Answer from "../../models/answer.model.js"

const createAnswer = async(data)=>{
    const newAnswer = Answer.create(data)
    await newAnswer.save();
    return newAnswer
}

const updateAnswer = async(id,data)=>{
    const updateAnswer =await Answer.findByIdAndUpdate(id,data);
    return updateAnswer;
}

// const getAnswer = async(id)=>{
//     const answer = await Answer.findById(id);
//     return answer
// }

const deleteAnswer = async(id)=>{
    const deleted = await Answer.findByIdAndDelete(id);
    return deleted;
}

export {createAnswer,updateAnswer,deleteAnswer}
