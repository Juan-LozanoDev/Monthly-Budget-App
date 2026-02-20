const { validationResult } = require("express-validator");

 const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    // Return error 400 if the requests is not valid
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    next();
};

module.exports = validateFields