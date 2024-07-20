import User from "../../models/user.model.js";
import bcrypt from "bcrypt"
export const createUser = async (user) => {
  console.log("🚀 ~ createUser ~ user:", user);
  const {
    email,
    purposeOfUse,
    age,
    title,
    positionOfUse,
    firstName,
    lastName,
    password,
  } = user;
  const hashPassword = await bcrypt.hash(password, 14);
  console.log("🚀 ~ createUser ~ hashPassword:", hashPassword);
  const newUser = await User.create({
    email,
    purposeOfUse,
    age,
    title,
    positionOfUse,
    firstName,
    lastName,
    password: hashPassword,
  });
  console.log("🚀 ~ createUser ~ newUser:", newUser);
  return newUser;
};
