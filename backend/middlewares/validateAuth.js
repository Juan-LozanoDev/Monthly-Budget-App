const jwt = require("jsonwebtoken");

const validateAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: "Not authorized, no token", authenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
        };

        next();
    } catch {
        return res.status(400).json({ message: "Not authorized, invalid token", authenticated: false });
    }
};

module.exports = validateAuth;
