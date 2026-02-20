const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const validateFields = require("../middlewares/validateFields");
const validateAuth = require("../middlewares/validateAuth");
const router = express.Router();

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

router.post(
    "/login",
    body("Email").notEmpty().isEmail(),
    body("Password")
        .notEmpty()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    validateFields,
    loginUser,
);

router.get("/getUser", validateAuth, getUserInfo);

module.exports = router;
