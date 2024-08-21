import User from "../../models/user.model.js";
import bcrypt from "bcrypt"
import { randomUserName } from "../../utils/randomUserName.js";
import {createProfile} from "../profile.service/profileInitial.js"

export const createUser = async (user) => {
  console.log("🚀 ~ createUser ~ user:", user);
  const {
    email,
    age,
    title,
    firstName,
    lastName,
    password,
  } = user;
  const hashPassword = await bcrypt.hash(password, 14);
  console.log("🚀 ~ createUser ~ hashPassword:", hashPassword);
  const userName = await randomUserName(email)
  console.log("🚀 ~ createUser ~ userName :", userName )
  const newUser = await User.create({
    email,
    age,
    title,
    firstName,
    lastName,
    userName,
    password: hashPassword,
  });
  await newUser.save();
  const newProfile = await createProfile(newUser._id)
  await newProfile.save()
  console.log("🚀 ~ createUser ~ newUser:", newUser);
  return newUser;
};
