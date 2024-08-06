import {
  createHistory,
  deleteHistory,
  getAllHistories,
  getHistoryById,
  updateHistory,
} from "../services/history.service/crud.history";

const createHistoryController = async (req, res) => {
  try {
    const history = await createHistory(req.body);
    res.status(201).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHistoryByIdController = async (req, res) => {
  try {
    const history = await getHistoryById(req.params.id);
    if (history) {
      res.status(200).json(history);
    } else {
      res.status(404).json({ message: "History not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllHistoriesController = async (req, res) => {
  try {
    const histories = await getAllHistories();
    res.status(200).json(histories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHistoryController = async (req, res) => {
  try {
    const updatedHistory = await updateHistory(req.params.id, req.body);
    if (updatedHistory) {
      res.status(200).json(updatedHistory);
    } else {
      res.status(404).json({ message: "History not found" });
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
