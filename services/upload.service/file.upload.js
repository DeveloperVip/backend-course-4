import { cloudinary } from "../../cloudinary.config.js";
import Profile from "../../models/profile.model.js";

const uploadFile =async(file,userId)=>{
    console.log("file",file)
    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const fileName = file.originalname.split('.')[0];
    const profileId = await Profile.findOne({userId:userId})
    await cloudinary.uploader.upload(dataUrl, {
        public_id: fileName,
        resource_type: 'auto',
        folder:"file-uploads"
        // có thể thêm field folder nếu như muốn tổ chức
    },(err, result) => {
        if (result) {
            console.log(result);
            profileId.avatar.public_id = result.public_id;
            profileId.avatar.secure_url = result.secure_url;
            // lấy secure_url từ đây để lưu vào database.
        }
    });
    await profileId.save();
    return profileId;
}

export {uploadFile}