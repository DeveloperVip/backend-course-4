import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import { getResponseData } from "../../utils/respone.js";

export const tokenMiddleware = async (req, res, next) => {
  console.log("🚀 ~ tokenMiddleware ~ req.headers.Authorization:", req.headers.authorization)
    const authorizationHeader = await req.headers.authorization;
    
    if (!authorizationHeader) {
        const response = getResponseData({data:null,status:false,message: "Authorization header is missing" })
      return res.status(401).json(response);
    }
  
    const token = authorizationHeader.split(" ")[1];
    
    if (!token) {
        const response = getResponseData({data:null,status:false,message: "Token is missing"  })
      return res.status(401).json(response);
    }
    try {
      console.log("🚀 ~ tokenMiddleware ~ token:", token)
      const payload = jwt.verify(token, "hunghoang14");
      console.log("🚀 ~ userMiddleware ~ payload:", payload)
      if (payload) {
        const select = await User.findOne({email:payload.email}).exec();
        console.log("🚀 ~ userMiddleware ~ select:", select)
  
        req.user = { ...payload, userId: select._id,password : select.password };
        return next();
      } else return res.status(401).json({ message: "token invalid" });
    } catch (error) {
      return res.status(404).json({ message: "transmission error" });
    }
  };