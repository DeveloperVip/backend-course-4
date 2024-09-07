import User from "../models/user.model.js";

export const randomUserName = async (email) => {
  let userNameBase = email.split("@")[0];

  // Function to generate random 5-character alphanumeric string
  const generateRandomString = (length = 5) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      result += randomCharacter;
    }
    return result;
  };

  // Append random characters and check uniqueness
  let userName = userNameBase + generateRandomString();
  while (await User.findOne({ userName })) {
    userName = userNameBase + generateRandomString();
  }
  return userName;
};
