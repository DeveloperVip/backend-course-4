import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
const authPassword = async (req, res, next) => {
  const { password } = req.body;
  console.log("🚀 ~ authPassword ~ req.body:", req.body);
  const passwordCorrect = await bcrypt.compare(password, req.user.password);
  console.log("🚀 ~ authPassword ~ passwordCorrect:", passwordCorrect);
  if (passwordCorrect) next();
  else return res.status(400).json({ message: "password is incorrect" });
};

const authUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email }).exec();
  console.log(user);
  if (user) {
    req.user = { password: user.password };
    next();
  } else return res.status(400).json({ message: "User does not exist" });
};
export { authPassword, authUser };
