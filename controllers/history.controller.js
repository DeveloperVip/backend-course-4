import {
  createHistory,
  deleteHistory,
  getAllHistories,
  getHistoryById,
  updateHistory,
} from "../services/history.service/crud.history.js";
import { getResponseData } from "../utils/respone.js";

const createHistoryController = async (req, res) => {
  try {
    const {
      lessonId,
      correctAnswer,
      wrongAnswer,
      score,
      time,
      allAnswersSelected,
    } = req.body;
    const data = {
      userId: req.user.userId,
      quiz: lessonId,
      correctAnswer: correctAnswer,
      wrongAnswer: wrongAnswer,
      point: score,
      time: time,
      allAnswersSelected: allAnswersSelected,
    };
    // console.log("🚀 ~ createHistoryController ~ req.body:", data);
    const history = await createHistory(data);
    const response = getResponseData({
      data: history,
      status: true,
      message: "Create history success",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHistoryByIdController = async (req, res) => {
  try {
    const history = await getHistoryById(req.params.id);
    if (history) {
      const response = getResponseData({
        data: history,
        status: true,
        message: "get history success",
      });
      res.status(200).json(response);
    } else {
      const response = getResponseData({
        data: null,
        status: true,
        message: "History not found",
      });
      res.status(404).json(response);
    }
  } catch (error) {
    const response = getResponseData({
      data: null,
      status: true,
      message: error.message,
    });
    res.status(400).json(response);
  }
};

const getAllHistoriesController = async (req, res) => {
  try {
    // console.log(
    //   "🚀 ~ getAllHistoriesController ~ req.user.userId:",
    //   req.user.userId
    // );
    const histories = await getAllHistories(req.user.userId);
    const response = getResponseData({
      data: histories,
      status: true,
      message: "History user",
    });
    res.status(200).json(response);
  } catch (error) {
    const response = getResponseData({
      data: null,
      status: true,
      message: error.message,
    });
    res.status(400).json(response);
  }
};

const updateHistoryController = async (req, res) => {
  try {
    const updatedHistory = await updateHistory(req.params.id, req.body);
    if (updatedHistory) {
      const response = getResponseData({
        data: updatedHistory,
        status: true,
        message: "History user",
      });
      res.status(200).json(response);
    } else {
      const response = getResponseData({
        data: null,
        status: true,
        message: "History not found",
      });
      res.status(404).json(response);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteHistoryController = async (req, res) => {
  try {
    await deleteHistory(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createHistoryController,
  getHistoryByIdController,
  getAllHistoriesController,
  updateHistoryController,
  deleteHistoryController,
};
