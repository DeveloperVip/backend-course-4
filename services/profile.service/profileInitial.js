import Profile from "../../models/profile.model.js";

// Service để tạo mới profile của người dùng
const createProfile = async (userId) => {
    try {
      console.log(userId);
      const newProfile = await Profile.create({ userId: userId });
      console.log("🚀 ~ createProfile ~ newProfile:", newProfile);
      await newProfile.save()
      return newProfile;
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  };

export {createProfile}