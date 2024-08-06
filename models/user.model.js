import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    default: "",
  },
  title: {
    type: String,
    default: "Personal",
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  userName:{
    type:String,
  },
  password: {
    type: String,
    require: true,
  },
});
const User = mongoose.model("user", userSchema);
export default User;
