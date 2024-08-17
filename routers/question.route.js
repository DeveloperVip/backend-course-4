import express from "express";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";
import {
    createQuestionController,
    updateQuestionController,
    getQuestionController,
    deleteQuestionController,
    uploadImageQuestionController,
    updateImageQuestionController
} from "../controllers/question.controller.js";
import { upload } from "../cloudinary.config.js";

const questionRouter = express.Router();
questionRouter.post("/api/image/upload", upload.single("file"), tokenMiddleware, uploadImageQuestionController);

questionRouter.put("/api/upload/update/:id", upload.single("file"), tokenMiddleware, updateImageQuestionController);

questionRouter.post("/create", tokenMiddleware, createQuestionController);
questionRouter.put("/update/:id", tokenMiddleware, updateQuestionController);
questionRouter.get("/", tokenMiddleware, getQuestionController);
questionRouter.delete("/delete/:id", tokenMiddleware, deleteQuestionController);

export default questionRouter;
