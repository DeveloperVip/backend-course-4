import express from "express";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";
import {
  createQuestionController,
  updateQuestionController,
  getQuestionController,
  deleteQuestionController,
  uploadImageQuestionController,
  updateImageQuestionController,
  getQuestionByIdController,
} from "../controllers/question.controller.js";
import { upload } from "../cloudinary.config.js";
import { convertTimeToMilliseconds } from "../middlewares/convertTimeToMilliseconds.js";

const questionRouter = express.Router();
questionRouter.post(
  "/api/image/upload",
  upload.single("file"),
  tokenMiddleware,
  uploadImageQuestionController
);

questionRouter.put(
  "/api/upload/update/:id",
  upload.single("file"),
  tokenMiddleware,
  updateImageQuestionController
);

questionRouter.post(
  "/create",
  tokenMiddleware,
  convertTimeToMilliseconds,
  createQuestionController
);
questionRouter.put(
  "/update/:id",
  tokenMiddleware,
  convertTimeToMilliseconds,
  updateQuestionController
);
questionRouter.get("/", tokenMiddleware, getQuestionController);
questionRouter.get("/get/:id", tokenMiddleware, getQuestionByIdController);
questionRouter.delete("/delete/:id", tokenMiddleware, deleteQuestionController);

export default questionRouter;
