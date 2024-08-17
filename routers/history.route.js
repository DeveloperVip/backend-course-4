import express from "express";
import {
    createHistoryController,
    getHistoryByIdController,
    getAllHistoriesController,
    updateHistoryController,
    deleteHistoryController
} from "../controllers/history.controller.js";

const historyRouter = express.Router();

historyRouter.post("/create", createHistoryController);
historyRouter.get("/:id", getHistoryByIdController);
historyRouter.get("/", getAllHistoriesController);
historyRouter.put("/update:id", updateHistoryController);
historyRouter.delete("/delete:id", deleteHistoryController);

export default historyRouter;
