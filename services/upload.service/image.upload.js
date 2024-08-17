import { cloudinary } from "../../cloudinary.config.js";
import Answer from "../../models/answer.model.js";

const uploadImage =async(image)=>{
    console.log("image",image)
    const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    const fileName = image.originalname.split('.')[0];
    await cloudinary.uploader.upload(dataUrl, {
        public_id: fileName,
        resource_type: 'auto',
        folder:"related-pictures"
    },async(err, result) => {
        if (result) {
            console.log(result);
            const newAnswer = new Answer.create({
                relatedPictures: {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                },
            });
            await newAnswer.save();

            return newAnswer;
        }
    });
}

const updateImage = async(image,answerId)=>{
    console.log("image",image)
    const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
    const fileName = image.originalname.split('.')[0];
    const answer =await Answer.findById(answerId)
    await cloudinary.uploader.upload(dataUrl, {
        public_id: fileName,
        resource_type: 'auto',
        folder:"related-pictures"
    },async(err, result) => {
        if (result) {
            console.log(result);
            answer.relatedPictures.public_id = result.public_id
            answer.relatedPictures.secure_url = result.secure_url
            await answer.save();

            return answer;
        }
    });
}

export {uploadImage,updateImage}