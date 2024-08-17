import express from "express";
import { upload } from "../cloudinary.config.js";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";
import {
    uploadImageController,
    updateImageController,
    createAnswerController,
    updateAnswerController
} from "../controllers/answer.controller.js";

const answerRouter = express.Router();

answerRouter.post("/api/image/upload", upload.single("file"), tokenMiddleware, uploadImageController);

answerRouter.put("/api/upload/update/:id", upload.single("file"), tokenMiddleware, updateImageController);

answerRouter.post("/create-answer", tokenMiddleware, createAnswerController);

answerRouter.put("/update-answer/:id", tokenMiddleware, updateAnswerController);

export default answerRouter;
