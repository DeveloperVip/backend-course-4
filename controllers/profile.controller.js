import { uploadFile } from "../services/upload.service/file.upload.js";
import { getProfile, updateProfile } from "../services/profile.service/updateProfile.js";
import { getResponseData } from "../utils/respone.js";

const uploadFileController = async (req, res) => {
  const file = req.file;
  const userId = req.user.userId;
  if (!file) {
    const response = getResponseData({
      data: null,
      status: false,
      message: "Không có tệp được tải lên.",
    });
    res.status(400).json(response);
  } else {
    const avatar = await uploadFile(file, userId);
    const response = getResponseData({
      data: avatar,
      status: true,
      message: "Upload avatar success",
    });
    res.status(200).json(response);
  }
};

const getProfileByUserId = async(req, res)=>{
  const userId = req.user.userId
  // console.log("🚀 ~ getProfileByUserId ~ userId:", userId)
  const profile = await getProfile(userId)
  const response = getResponseData({
    data: profile,
    status: true,
    message: "Get profile success",
  });
  res.status(200).json(response);
}

const updateProfileController = async (req, res) => {
  const id = req.params.id;
  // console.log("🚀 ~ updateProfileController ~ req.body:", req.body,id)
  const profile = await updateProfile(id, req.body);
  const response = getResponseData({
    data: profile,
    status: true,
    message: "Update success",
  });
  res.status(200).json(response);
};

export { uploadFileController, updateProfileController,getProfileByUserId };
