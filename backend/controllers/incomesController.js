const { requestIncomes, createIncome, editIncome, removeIncome } = require("../models/Income");

// Get all the incomes of the user id
const getIncomes = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        requestIncomes(userId, (err, incomes) => {
            if (err) return res.status(400).json({ error: err });
            if (!incomes) return res.status(404).json({ message: "Not incomes founded" });

            return res.status(200).json(incomes);
        });
    } catch (err) {
        res.status(500).json({ message: "Error obtaining the incomes, try later", error: err });
    }
};

// Create a new income for the user id
const addIncome = async (req, res) => {
    const userId = req.user?.id;
    const { category, amount, date } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!category || !amount || !date) return res.status(400).json({ message: "All the fields are required" });
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: "The amount have to be a positive integer" });

    try {
        const income = { user_id: userId, category: category, income: amount, income_date: date };
        createIncome(income, (err, result) => {
            if (err) return res.status(400).json({ error: err });
            if (!result) return res.status(400).json({ message: "Something happen, unable to create the income" });

            return res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating the income, please try later", error: error });
    }
};

// Modify an income based on the income_id
const modifyIncome = (req, res) => {
    const userId = req.user?.id;
    const { incomeId, category, amount, date } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!incomeId) return res.status(404).json({ message: "Not income founded" });
    if (!category || !amount || !date) return res.status(400).json({ message: "The fields are required" });
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: "The amount have to be a integer" });

    try {
        const income = { category: category, income: amount, income_date: date };
        editIncome(income, incomeId, userId, (err, result) => {
            if (err) return res.status(400).json({ message: "You are not allowed to do that" });
            if (!result) return res.status(400).json({ message: "Something happen, unable to create the income" });

            return res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating the income, please try later", error: error });
    }
};

// Delete an income based on the income_id
const deleteIncome = (req, res) => {};

module.exports = { getIncomes, addIncome, modifyIncome, deleteIncome };
