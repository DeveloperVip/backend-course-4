import express from "express";
import {
  createHistoryController,
  getHistoryByIdController,
  getAllHistoriesController,
  updateHistoryController,
  deleteHistoryController,
} from "../controllers/history.controller.js";
import { tokenMiddleware } from "../middlewares/user.middleware/token.auth.js";

const historyRouter = express.Router();

historyRouter.post("/create", tokenMiddleware, createHistoryController);
historyRouter.get("/get/:id", tokenMiddleware, getHistoryByIdController);
historyRouter.get("/getAllHistory", tokenMiddleware, getAllHistoriesController);
historyRouter.put("/update:id", updateHistoryController);
historyRouter.delete("/delete:id", deleteHistoryController);

export default historyRouter;
