import { checkEmail, loginUser } from "../services/user.service/login.js";
import { createUser } from "../services/user.service/register.js";
import { deleteUser, updateUser } from "../services/user.service/update.js";

import User from "../models/user.model.js";
import { randomUserName } from "../utils/randomUserName.js";

import passport from "passport";
import { getResponseData } from "../utils/respone.js";
import { createProfile } from "../services/profile.service/profileInitial.js";

const checkEmailController = async (req, res) => {
  const email = req.body.email;
  const existEmail = await checkEmail(email);
  if (existEmail) {
    const response = getResponseData({
      data: existEmail,
      status: true,
      message: "success",
    });
    res.status(200).json(response);
  } else {
    const response = getResponseData({
      data: null,
      status: false,
      message: "email not exist",
    });
    res.status(201).json(response);
  }
};

const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const response = getResponseData({
      data: user,
      status: true,
      message: "success",
    });
    res.status(200).json(response);
  } catch (error) {
    const response = getResponseData({
      data: null,
      status: false,
      message: "lỗi hệ thống",
    });
    res.status(500).json(response);
  }
};

const loginUserController = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    const response = getResponseData({
      data: { token },
      status: true,
      message: "success",
    });
    res.send(response);
  } catch (e) {
    res.status(500).json({ status: false, message: "Login failed" });
  }
};

const googleAuthController = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleAuthCallbackController = async (req, res) => {
  try {
    const { email, family_name, given_name } = req.user._json;
    const userName = randomUserName(email);
    const newUser = new User({
      email,
      family_name,
      given_name,
      userName,
    });

    await newUser.save();
    const newProfile = createProfile(newUser._id);
    await newProfile.save();
    res.redirect("/user/profile");
  } catch (error) {
    console.error("Error during Google authentication:", error);
    res.redirect("/");
  }
};

const profileController = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.send(`<h1>Hello ${req.user.displayName}</h1>`);
  }
};

const logoutController = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
};

const updateUserController = async (req, res) => {
  const id = req.params.id;
  const updated = await updateUser(id, req.body);
  if (updated) {
    const response = getResponseData({
      data: updated,
      status: 200,
      message: "Updated access",
    });
    res.status(200).json(response);
  } else {
    const response = getResponseData({
      data: null,
      status: 400,
      message: "Updated not access",
    });
    res.status(400).json(response);
  }
};

const deleteUserController = async (req, res) => {
  const id = req.params.id;
  const deleted = await deleteUser(id);
  if (deleted) {
    const response = getResponseData({
      data: deleted,
      status: 200,
      message: "deleted access",
    });
    res.status(200).json(response);
  } else {
    const response = getResponseData({
      data: null,
      status: 400,
      message: "deleted not access",
    });
    res.status(400).json(response);
  }
};

export {
  checkEmailController,
  createUserController,
  loginUserController,
  googleAuthController,
  googleAuthCallbackController,
  profileController,
  logoutController,
  updateUserController,
  deleteUserController,
};
