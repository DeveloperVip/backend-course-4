import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
const loginUser = async (user) => {
  console.log("🚀 ~ loginUser ~ user:", user)
  const payLoad = {
    userName: user.userName,
    email: user.email,
  };

  const token = jwt.sign(payLoad, "hunghoang14", { expiresIn: "1h" });
  const data = {
    token:token,
    userName:user.userName
  }
  return data;
};
const checkEmail = async(email)=>{
  const data = await User.findOne({email:email},{_id:1,email:1}).exec();
  return data
}

export { loginUser,checkEmail };
