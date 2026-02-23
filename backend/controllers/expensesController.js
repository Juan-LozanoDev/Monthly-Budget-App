const { createExpense, requestExpenses, removeExpense, editExpense } = require("../models/Expense");

// Get all expenses of the user id
const getExpenses = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        requestExpenses(userId, (err, expenses) => {
            if (err) return res.status(400).json({ error: err });
            if (!expenses) return res.status(404).json({ message: "Not expenses founded" });

            return res.status(200).json(expenses);
        });
    } catch (err) {
        res.status(500).json({ message: "Error obtaining the expenses, please try again later", error: err });
    }
};

// Create a new expense for the user id
const addExpense = async (req, res) => {
    const userId = req.user?.id;
    const { category, amount, date } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!category || !amount || !date) return res.status(400).json({ message: "All the fields are required" });
    if (typeof amount !== "number" || amount <= 0)
        return res.status(400).json({ message: "The amount have to be a positive integer" });

    try {
        const expense = { user_id: userId, category: category, expense: amount, expense_date: date };
        createExpense(expense, (err, result) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: "Something happen, database error, unable to create the expense" });
            if (!result) return res.status(400).json({ message: "Something happen, unable to create the expense" });

            return res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating the expense, please try again later", error: error });
    }
};

// Modify an expense based on the expense_id
const modifyExpense = async (req, res) => {
    const userId = req.user?.id;
    const { expenseId, category, amount, date } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!expenseId) return res.status(404).json({ message: "Not expense founded" });
    if (!category || !amount || !date) return res.status(400).json({ message: "The fields are required" });
    if (typeof amount !== "number" || amount <= 0)
        return res.status(400).json({ message: "The amount have to be a integer" });

    try {
        const expense = { category: category, expense: amount, expense_date: date };
        editExpense(expense, expenseId, userId, (err, result) => {
            if (err) return res.status(400).json({ message: "You are not allowed to do that" });
            if (!result) return res.status(400).json({ message: "Something happened, unable to create the expense" });

            return res.status(200).json(result);
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating the expense, please try again later", error: error });
    }
};

// Delete an expense based on the expense_id
const deleteExpense = async (req, res) => {
    const userId = req.user?.id;
    const { expenseId } = req.body || {};

    if (!userId) return res.status(401).json({ message: "Not authorized, no token" });
    if (!expenseId) return res.status(404).json({ message: "Not expense found" });

    try {
        removeExpense(expenseId, userId, (err, result) => {
            if (err) return res.status(500).json("Database error");
            if (!result) return res.status(403).json({ message: "You aren't allowed to do that" });

            return res.status(200).json({ message: "Expense deleted successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting the expense, please try again later", error: error });
    }
};

module.exports = { getExpenses, addExpense, modifyExpense, deleteExpense };
