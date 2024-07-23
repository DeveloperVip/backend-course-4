import jwt from "jsonwebtoken";
const loginUser = async (user) => {
  const payLoad = {
    lastName: user.lastName,
    email: user.email,
  };

  const token = jwt.sign(payLoad, "hunghoang14", { expiresIn: "1h" });
  return token;
};


export { loginUser };
