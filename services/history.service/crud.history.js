import History from "../../models/history.model.js";


const createHistory = async (data) => {
    console.log("🚀 ~ createHistory ~ data:", data)
    try {
        const newHistory = await History.create(data);
        console.log("🚀 ~ createHistory ~ newHistory:", newHistory)
        return newHistory;
    } catch (error) {
        throw new Error("Error creating history: " + error.message);
    }
};

const getHistoryById = async (id) => {
    console.log("🚀 ~ getHistoryById ~ id:", id)
    try {
        const history = await History.findById(id).populate('userId').populate({
            path:'quiz',
            select:"-userId",
            populate:[
                {
                    path:"question",
                    select:"-userId",
                    populate:{
                        path:"answers"
                    }
                },{
                    path:"topic",
                    select:"name"
                }
            ]
        });
        console.log("🚀 ~ history ~ history:", history)
        return history;
    } catch (error) {
        throw new Error("Error getting history: " + error.message);
    }
};

const getAllHistories = async (userId) => {
    try {
        const histories = await History.find({userId:userId}).populate('userId').populate('quiz');
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
