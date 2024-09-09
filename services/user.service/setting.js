import User from "../../models/user.model.js"

export const getInfor =async (userId) => {
    const user =await User.findById(userId,{email:1,userName:1,lastName:1,firstName:1}).exec();
    return user;
}