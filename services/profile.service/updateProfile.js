import Profile from "../../models/profile.model.js";

export const updateProfile = async (id, updateData) => {
  // console.log("🚀 ~ updateProfile ~ updateData:", updateData);
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      {
        ...updateData,
        grade: updateData.selectedClasses,
        subjects: updateData.selectedSubjects,
      },
      {
        new: true,
      }
    );
    return updatedProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getProfile = async (userId) => {
  // console.log("🚀 ~ getProfile ~ userId:", userId);
  try {
    const profile = await Profile.findOne({ userId: userId });
    // console.log("🚀 ~ getProfile ~ profile:", profile);
    return profile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
