import {
  authPassword,
  authUser,
} from "../middlewares/user.middleware/user.auth.js";
import { loginUser } from "../services/user.service/login.js";
import { createUser } from "../services/user.service/register.js";
import express from "express";
import { getResponseData } from "../utils/respone.js";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/create-user", async (req, res) => {
  try {
    // console.log("here");
    // console.log("🚀 ~ userRouter.post ~ req:", req.body);
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
});
userRouter.post("/login", authUser, authPassword, async (req, res) => {
  // get username and password from request
  try {
    const token = await loginUser(req.body);
    console.log("🚀 ~ userRouter.post ~ token:", token);
    const response = getResponseData({
      data: { token },
      status: true,
      message: "success",
    });
    // find user from database
    res.send(response);
  } catch (e) {}
});
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route to handle the callback from Google OAuth
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("vao 4");
    // Successful authentication, redirect to profile.
    res.redirect("/user/profile");
  }
);

// Route to handle profile
userRouter.get("/profile", (req, res) => {
    console.log('Cookies:', req.cookies); // Kiểm tra cookies có được gửi không
    console.log('Session:', req.session); // Kiểm tra session
  if (!req.user) {
    console.log("vao 5");
    res.redirect("/");
  } else {
    console.log("vao 6");
    res.send(`<h1>Hello ${req.user.displayName}</h1>`);
  }
});

// Route to handle logout
userRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});
export default userRouter;
