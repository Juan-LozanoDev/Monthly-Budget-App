const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const validateFields = require("../middlewares/validateFields");
const validateAuth = require("../middlewares/validateAuth");
const router = express.Router();

// Route for sign up users
router.post(
    "/signup",
    body("Fullname")
        .notEmpty()
        .matches(/^[a-zA-ZñÑ ]{3,50}$/),
    body("Email").notEmpty().isEmail(),
    body("Password")
        .notEmpty()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    validateFields,
    registerUser,
);

// Route for login users
router.post(
    "/login",
    body("Email").notEmpty().isEmail(),
    body("Password")
        .notEmpty()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    validateFields,
    loginUser,
);

// Route for obtain all the user information
router.get("/getUser", validateAuth, getUserInfo);

module.exports = router;
