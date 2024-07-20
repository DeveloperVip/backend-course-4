import {
  authPassword,
  authUser,
} from "../middlewares/user.middleware/user.auth.js";
import { loginUser } from "../services/user.service/login.js";
import { createUser } from "../services/user.service/register.js";
import express from "express";
import { getResponseData } from "../utils/respone.js";
const userRouter = express.Router();

userRouter.post("/create-user", async (req, res) => {
  try{
    console.log("here");
  console.log("🚀 ~ userRouter.post ~ req:", req.body);
  const user = await createUser(req.body);
  const response = getResponseData({data:user,status:true,message:"success"})
  res.status(200).json(response);
  } catch(error){
    const response = getResponseData({data:null,status:false,message:"lỗi hệ thống"})
    res.status(500).json(response)}
});
userRouter.post("/login", authUser, authPassword, async (req, res) => {
  // get username and password from request
  try{
    const token = await loginUser(req.body);
  console.log("🚀 ~ userRouter.post ~ token:", token);
  const response = getResponseData({
    data: { token },
    status: true,
    message: "success",
  });
  // find user from database
  res.send(response);
  } catch(e){}
});
export default userRouter;
