const express = require("express");
const router = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const { getIncomes, addIncome, modifyIncome, deleteIncome } = require("../controllers/incomesController");

// Route for obtain all the incomes information
router.get("/getIncomes", validateAuth, getIncomes);

// Route for post an income
router.post("/addIncome", validateAuth, addIncome);

// Route for modify an income
router.put("/modifyIncome", validateAuth, modifyIncome);

// Route for delete an income
router.delete("/deleteIncome", validateAuth, deleteIncome);

module.exports = router;
