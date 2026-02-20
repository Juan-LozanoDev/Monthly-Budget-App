const { validationResult } = require("express-validator");

 const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    // Return error 400 if the requests is not valid
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Please, validate the fields" });
    }

    next();
};

module.exports = validateFields