import Profile from "../../models/profile.model.js";

export const updateProfile = async (id, updateData) => {
    try {
      const updatedProfile = await Profile.findByIdAndUpdate({ id }, updateData, {
        new: true,
      });
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };