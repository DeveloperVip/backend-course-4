import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import userRouter from "../routers/user.route.js";
import profileRouter from "../routers/profile.route.js";
import questionRouter from "../routers/question.route.js";
import answerRouter from "../routers/answer.route.js";
import topicRouter from "../routers/topic.route.js";
import quizRouter from "../routers/quiz.route.js";
import historyRouter from "../routers/history.route.js";
import User from "../models/user.model.js";
import { createProfile } from "../services/profile.service/profileInitial.js";
import { randomUserName } from "../utils/randomUserName.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
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
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await User.findOne({ email: profile._json.email });

        if (existingUser) {
          // Nếu người dùng đã tồn tại, trả về thông tin người dùng
          return done(null, existingUser);
        } else {
          // Nếu người dùng chưa tồn tại, tạo người dùng mới
          const newUser = new User({
            email: profile._json.email,
            family_name: profile._json.family_name,
            given_name: profile._json.given_name,
            userName: await randomUserName(profile._json.email),
          });

          await newUser.save();

          // Khởi tạo hồ sơ người dùng
          await createProfile(newUser._id);

          return done(null, newUser);
        }
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error, null);
      }
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

//router controller
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/question", questionRouter);
app.use("/answer", answerRouter);
app.use("/topic", topicRouter);
app.use("/quiz", quizRouter);
app.use("/history", historyRouter);

//connect database
mongoose
  .connect(
    "mongodb+srv://h1403lovea0711:14032003@cluster0.jqrbnu2.mongodb.net/project-course-5?retryWrites=true&w=majority&appName=Cluster0",
    { autoCreate: false }
  )
  .then(() => {
    console.log("database is connect");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log("Server is running!");
});
