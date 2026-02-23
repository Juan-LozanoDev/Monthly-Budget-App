const { requestInvestments, createInvestment, editInvestment, removeInvestment } = require("../models/Investment");

// Get all investments of the user id
const getInvestments = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        requestInvestments(userId, (err, investments) => {
            if (err) return res.status(400).json({ error: err });
            if (!investments) return res.status(404).json({ message: "Not investments founded" });

            return res.status(200).json(investments);
        });
    } catch (err) {
        res.status(500).json({ message: "Error obtaining the investments, please try again later", error: err });
    }
};

const addInvestment = async (req, res) => {
    const userId = req.user?.id;
    const { category, amount, date } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!category || !amount || !date) return res.status(400).json({ message: "All the fields are required" });
    if (typeof amount !== "number" || amount <= 0)
        return res.status(400).json({ message: "The amount have to be a positive integer" });

    try {
        const investment = { user_id: userId, category: category, investment: amount, investment_date: date };
        createInvestment(investment, (err, result) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "Something happen, database error, unable to create the investment" });
            if (!result) return res.status(400).json({ message: "Something happen, unable to create the investment" });

            return res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating the investment, please try again later", error: error });
    }
};

const modifyInvestment = async (req, res) => {
    const userId = req.user?.id;
    const { investmentId, category, amount, date } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!investmentId) return res.status(404).json({ message: "Not investment founded" });
    if (!category || !amount || !date) return res.status(400).json({ message: "The fields are required" });
    if (typeof amount !== "number" || amount <= 0)
        return res.status(400).json({ message: "The amount have to be a integer" });

    try {
        const investment = { category: category, investment: amount, investment_date: date };
        editInvestment(investment, investmentId, userId, (err, result) => {
            if (err) return res.status(400).json({ message: "You are not allowed to do that" });
            if (!result)
                return res.status(400).json({ message: "Something happened, unable to create the investment" });

            return res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating the investment, please try again later", error: error });
    }
};

const deleteInvestment = async (req, res) => {
    const userId = req.user?.id;
    const { investmentId } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!investmentId) return res.status(404).json({ message: "Not investment found" });

    try {
        removeInvestment(investmentId, userId, (err, result) => {
            if (err) return res.status(500).json("Database error");
            if (!result) return res.status(403).json({ message: "You aren't allowed to do that" });

            return res.status(200).json({ message: "Investment deleted successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting the investment, please try again later", error: error });
    }
};

module.exports = { getInvestments, addInvestment, modifyInvestment, deleteInvestment };
