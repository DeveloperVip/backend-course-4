import express from "express";
import { upload } from "../cloudinary.config.js";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";
import {
  uploadFileController,
  updateProfileController,
} from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.post(
  "/api/v1/upload",
  upload.single("file"),
  tokenMiddleware,
  uploadFileController
);

profileRouter.put(
  "/update-profile/:id",
  tokenMiddleware,
  updateProfileController
);

export default profileRouter;
