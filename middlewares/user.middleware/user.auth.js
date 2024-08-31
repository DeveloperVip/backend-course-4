import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import { getResponseData } from "../../utils/respone.js";
const authPassword = async (req, res, next) => {
  console.log("🚀 ~ authPassword ~ req.body:", req.body);
  const { password } = req.body;
  const passwordCorrect = await bcrypt.compare(password, req.user.password);
  console.log("🚀 ~ authPassword ~ passwordCorrect:", passwordCorrect);
  if (passwordCorrect) next();
  else {
    const response = getResponseData({
      data: null,
      status: false,
      message: "Tài khoản hoặc mật khẩu không chính xác ",
    });
    return res.status(400).json(response);
  }
};

const authUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email }).exec();
  console.log(user);
  if (user) {
    req.user = { password: user.password,email:user.email,userName:user.userName };
    next();
  } else {
    const response = getResponseData({
      data: null,
      status: false,
      message: "Tài khoản hoặc mật khẩu không chính xác ",
    });
    return res.status(400).json(response);
  }
};
export { authPassword, authUser };
