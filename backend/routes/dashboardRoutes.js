const express = require("express");
const validateAuth = require("../middlewares/validateAuth");
const getUserDashboard = require("../controllers/dashboardController");
const router = express.Router();

router.get("/data", validateAuth, getUserDashboard);

module.exports = router