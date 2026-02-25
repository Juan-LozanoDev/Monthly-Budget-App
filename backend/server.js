require("dotenv").config();
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
        origin: "http://localhost:5173", // Define domain
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
);

const authRoutes = require("./routes/authRoutes");
const incomesRoutes = require("./routes/incomesRoutes");
const expensesRoutes = require("./routes/expensesRoutes");
const investmentsRoutes = require("./routes/investmentsRoutes");

// Global middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Authentication Route
app.use("/api/auth", authRoutes);

// Incomes Route
app.use("/api/incomes", incomesRoutes);

// Expenses Route
app.use("/api/expenses", expensesRoutes);

// Investments Route
app.use("/api/investments", investmentsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});
