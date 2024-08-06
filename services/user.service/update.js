import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
const updateUser = async (id, body) => {
  const { firstName, age, newPassword, email, lastName, userName } = body;

  // Tìm người dùng cần cập nhật
  const user = await User.findById(id);

  // Cập nhật các trường không phải là mảng place
  if (firstName !== undefined) user.firstName = firstName;
  if (lastName !== undefined) user.lastName = lastName;
  if (userName !== undefined) user.userName = userName;

  if (newPassword !== undefined) {
    const hashnewPassword = await bcrypt.hash(newPassword, 14);
    user.password = hashnewPassword;
  }
  if (age !== undefined) user.age = age;
  if (email !== undefined) user.email = email;

  // Cập nhật mảng place nếu có

  await user.save();
  return user;
};
//delete user
const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    await user.save();
    return user;
  };

  export {updateUser,deleteUser}
  
