import {
  authPassword,
  authUser,
} from "../middlewares/user.middleware/user.auth.js";
import { loginUser } from "../services/user.service/login.js";
import { createUser } from "../services/user.service/register.js";
import express from "express";
const userRouter = express.Router();

userRouter.post("/create-user", async (req, res) => {
  console.log("here");
  console.log("🚀 ~ userRouter.post ~ req:", req.body);
  const user = await createUser(req.body);
  res.send(user);
});
userRouter.post("/login", authUser, authPassword, async (req, res) => {
  // get username and password from request
  const token = await loginUser(req.body);
  console.log("🚀 ~ userRouter.post ~ token:", token);
  // find user from database
  res.send(token);
});
export default userRouter;
