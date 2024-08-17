import { cloudinary } from "../../cloudinary.config.js";
import Question from "../../models/Question.model.js";

const uploadImageQuestion =async(image)=>{
    console.log("image",image)
    const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    const fileName = image.originalname.split('.')[0];
    await cloudinary.uploader.upload(dataUrl, {
        public_id: fileName,
        resource_type: 'auto',
        folder:"question-pictures"
    },async(err, result) => {
        if (result) {
            console.log(result);
            const newQuestion = new Question.create({
                pictureQuestion: {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                },
            });
            await newQuestion.save();

            return newQuestion;
        }
    });
}

const updateImageQuestion = async(image,questionId)=>{
    console.log("image",image)
    const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    const fileName = image.originalname.split('.')[0];
    const question =await Question.findById(questionId)
    await cloudinary.uploader.upload(dataUrl, {
        public_id: fileName,
        resource_type: 'auto',
        folder:"question-pictures"
    },async(err, result) => {
        if (result) {
            console.log(result);
            question.pictureQuestion.public_id = result.public_id
            question.pictureQuestion.secure_url = result.secure_url
            await question.save();

            return question;
        }
    });
}

export {uploadImageQuestion,updateImageQuestion}