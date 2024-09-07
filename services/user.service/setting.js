import User from "../../models/user.model.js"

export const getInfor =async (userId) => {
    const user =await User.findById(userId,{email:1,userName:1}).exec();
    return user;
}