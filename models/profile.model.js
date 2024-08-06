import mongoose from "mongoose";
const schema = mongoose.Schema;
const profileSchema = new schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  grade: {
    type: String,
  },
  subjects: [
    {
      type: String,
    },
  ],
  purpose: {
    type: String,
    enum: ["school", "organization"],
    default: "school",
  },
  avatar: {
    public_id: { type: String, default: "file-uploads/02-1User-Outline" },
    secure_url: {
      type: String,
      default:
        "https://res.cloudinary.com/drmeotcu7/image/upload/v1722454139/file-uploads/02-1User-Outline.jpg",
    },
  },
});

const Profile = mongoose.model("profile", profileSchema);
export default Profile;
