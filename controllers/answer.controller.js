import { uploadImage, updateImage } from "../services/upload.service/image.upload.js";
import { createAnswer, updateAnswer } from "../services/answer.service/create.answer.js";
import { fileDestroy } from "../services/upload.service/file.destroy.js";
import { getResponseData } from "../utils/respone.js";

const uploadImageController = async (req, res) => {
    const image = req.file;
    if (!image) {
        const response = getResponseData({
            data: null,
            status: false,
            message: "Không có tệp được tải lên.",
        });
        res.status(400).json(response);
    } else {
        const uploadedImage = await uploadImage(image);
        const response = getResponseData({
            data: uploadedImage,
            status: true,
            message: "Upload avatar success",
        });
        res.status(200).json(response);
    }
};

const updateImageController = async (req, res) => {
    const image = req.file;
    const public_id = req.body.public_id;
    const answerId = req.params.id;
    if (!image) {
        const response = getResponseData({
            data: null,
            status: false,
            message: "Không có tệp được tải lên.",
        });
        res.status(400).json(response);
    } else {
        await fileDestroy(public_id);
        const updatedImage = await updateImage(image, answerId);
        const response = getResponseData({
            data: updatedImage,
            status: true,
            message: "Upload avatar success",
        });
        res.status(200).json(response);
    }
};

const createAnswerController = async (req, res) => {
    const content = await createAnswer(req.body);
    const response = getResponseData({
        data: content,
        status: true,
        message: "Create answer success",
    });
    res.status(200).json(response);
};

const updateAnswerController = async (req, res) => {
    const answerId = req.params.id;
    const content = await updateAnswer(answerId, req.body);
    const response = getResponseData({
        data: content,
        status: true,
        message: "Update answer success",
    });
    res.status(200).json(response);
};

export {
    uploadImageController,
    updateImageController,
    createAnswerController,
    updateAnswerController
};
