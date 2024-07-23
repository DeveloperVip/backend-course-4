import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from 'cookie-parser';
import cookieSession from "cookie-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userRouter from "./controllers/user.controller.js";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000", // Thay đổi theo địa chỉ frontend của bạn
    credentials: true,
  })
);
const port = 8000;
dotenv.config();
//config cookie session
app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);
//khởi tạo passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user profile information
      console.log("vao 1");
      return done(null, profile);
    }
  )
);
//tuần tự hóa người dùng đăng nhập thành phiên
passport.serializeUser((user, done) => {
  console.log("vao 2");
  done(null, user);
});
//giải tuần tự thông tin người dùng từ phiên
passport.deserializeUser((user, done) => {
  console.log("vao 3");
  done(null, user);
});
//connect database
mongoose
  .connect(
    "mongodb+srv://h1403lovea0711:14032003@cluster0.jqrbnu2.mongodb.net/project-course-5?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database is connect");
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/user", userRouter);
app.listen(port, () => {
  console.log("Server is running!");
});
