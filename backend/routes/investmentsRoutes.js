const express = require("express");
const router = express.Router();
const validateAuth = require("../middlewares/validateAuth");
const {
    getInvestments,
    addInvestment,
    modifyInvestment,
    deleteInvestment,
} = require("../controllers/investmentsController");

// Route for obtain all the investments information
router.get("/getInvestments", validateAuth, getInvestments);

// Route for post an income
router.post("/addInvestment", validateAuth, addInvestment);

// Route for modify an income
router.put("/modifyInvestment", validateAuth, modifyInvestment);

// Route for delete an income
router.delete("/deleteInvestment", validateAuth, deleteInvestment);

module.exports = router;
