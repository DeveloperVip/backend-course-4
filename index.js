import express from "express";
import mongoose from "mongoose";
import userRouter from "./controllers/user.controller.js";
const app = express();
app.use(express.json());
const port = 8000;

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
app.use(userRouter);
app.listen(port, () => {
  console.log("Server is running!");
});
