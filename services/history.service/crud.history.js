import History from "../../models/history.model.js";


const createHistory = async (data) => {
    try {
        const newHistory = new History.create(data);
        await newHistory.save();
        return newHistory;
    } catch (error) {
        throw new Error("Error creating history: " + error.message);
    }
};

const getHistoryById = async (id) => {
    try {
        const history = await History.findById(id).populate('userID').populate('quiz');
        return history;
    } catch (error) {
        throw new Error("Error getting history: " + error.message);
    }
};

const getAllHistories = async () => {
    try {
        const histories = await History.find().populate('userID').populate('quiz');
        return histories;
    } catch (error) {
        throw new Error("Error getting histories: " + error.message);
    }
};

const updateHistory = async (id, data) => {
    try {
        const updatedHistory = await History.findByIdAndUpdate(id, data, { new: true });
        return updatedHistory;
    } catch (error) {
        throw new Error("Error updating history: " + error.message);
    }
};

const deleteHistory = async (id) => {
    try {
        const deleted = await History.findByIdAndDelete(id);
        return deleted;
    } catch (error) {
        throw new Error("Error deleting history: " + error.message);
    }
};

export {
    createHistory,
    getHistoryById,
    getAllHistories,
    updateHistory,
    deleteHistory
};
