import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },

  purposeOfUse: {
    type: String,
    enum: ["School", "Work", "PersonalUse"],
    require: true,
  },
  age: {
    type: Number,
    default: "undefined",
  },
  title: {
    type: String,
    enum: ["Mr.", "Ms.", "Mrs.", "Dr.", "Mx."],
    default: "",
    require: true,
  },
  positionOfUse: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
const User = mongoose.model("user", userSchema);
export default User

