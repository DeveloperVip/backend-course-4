import express from "express";
import {
  checkEmailController,
  createUserController,
  loginUserController,
  googleAuthController,
  googleAuthCallbackController,
  profileController,
  logoutController,
  updateUserController,
  deleteUserController,
  getInforController,
} from "../controllers/user.controller.js";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";
import {
  authUser,
  authPassword,
} from "../middlewares/user.middleware/user.auth.js";
import passport from "passport";

const userRouter = express.Router();

userRouter.post("/check-email", checkEmailController);
userRouter.post("/create-user", createUserController);
userRouter.post("/login", authUser, authPassword, loginUserController);
userRouter.get("/get-infor", tokenMiddleware, getInforController);

userRouter.get("/auth/google", googleAuthController);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleAuthCallbackController
);

userRouter.get("/profile", profileController);
userRouter.get("/logout", logoutController);

userRouter.put(
  "/update-password/:id",
  tokenMiddleware,
  authPassword,
  updateUserController
);
userRouter.put("/update-user/:id", tokenMiddleware, updateUserController);
userRouter.delete("/delete/:id", tokenMiddleware, deleteUserController);

export default userRouter;
