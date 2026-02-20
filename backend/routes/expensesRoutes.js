const express = require("express");
const router = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const { getExpenses, addExpense, modifyExpense, deleteExpense } = require("../controllers/expensesController");

// Route for obtain all the expenses information
router.get("/getExpenses", validateAuth, getExpenses);

// Route for post an income
router.post("/addExpenses", validateAuth, addExpense);

// Route for modify an income
router.put("/modifyExpenses", validateAuth, modifyExpense);

// Route for delete an income
router.delete("/deleteExpenses", validateAuth, deleteExpense);

module.exports = router
