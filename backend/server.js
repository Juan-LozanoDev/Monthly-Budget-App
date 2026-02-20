require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

const app = express();

// Http security
app.use(helmet());

// Cors: Allow request from domain
app.use(
    cors({
        origin: "http://localhost:8000", // Define domain
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);

const authRoutes = require('./routes/authRoutes')

// Global middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});
