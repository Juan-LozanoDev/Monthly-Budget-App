const {
    totalExpenses,
    totalIncomes,
    totalInvestments,
    last30DaysIncomes,
    last30DaysExpenses,
    allTransactions,
    currentMonthIncomes,
    currentMonthExpenses,
} = require("../models/Dashboard");

// Function for obtaining the total amount of incomes of the user
const resultIncomes = (userId) => {
    return new Promise((resolve, reject) => {
        totalIncomes(userId, (err, result) => {
            if (err) return reject(err);
            resolve(result?.sum ?? 0);
        });
    });
};

// Function for obtaining the total amount of expenses of the user
const resultExpenses = (userId) => {
    return new Promise((resolve, reject) => {
        totalExpenses(userId, (err, result) => {
            if (err) return reject(err);
            resolve(result?.sum ?? 0);
        });
    });
};

// Function for obtaining the total amount of investments of the user
const resultInvestments = (userId) => {
    return new Promise((resolve, reject) => {
        totalInvestments(userId, (err, result) => {
            if (err) return reject(err);
            resolve(result?.sum ?? 0);
        });
    });
};

// Function for obtaining the last 60 days incomes of the user
const result30DaysIncomes = (userId) => {
    return new Promise((resolve, reject) => {
        last30DaysIncomes(userId, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result ?? []);
        });
    });
};

// Function for obtaining the last 30 days expenses of the user
const result30DaysExpenses = (userId) => {
    return new Promise((resolve, reject) => {
        last30DaysExpenses(userId, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result ?? []);
        });
    });
};

// Function for obtaining last 10 transactions of the user
const last10Transactions = (userId) => {
    return new Promise((resolve, reject) => {
        allTransactions(userId, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result ?? []);
        });
    });
};

// Function for obtaining current month incomes of the user
const monthlyIncomes = (userId) => {
    return new Promise((resolve, reject) => {
        currentMonthIncomes(userId, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result ?? []);
        });
    });
};

// Function for obtaining current month expenses of the user
const monthlyExpenses = (userId) => {
    return new Promise((resolve, reject) => {
        currentMonthExpenses(userId, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result ?? []);
        });
    });
};

const getUserDashboard = async (req, res) => {
    const userId = req.user?.id;

    try {
        const getTotalIncomes = await resultIncomes(userId);
        const getTotalExpenses = await resultExpenses(userId);
        const getTotalInvestments = await resultInvestments(userId);
        const getLast60DaysOfIncomes = await result30DaysIncomes(userId);
        const getLast30DaysOfExpenses = await result30DaysExpenses(userId);
        const getLast10Transactions = await last10Transactions(userId);
        const getMonthlyIncomes = await monthlyIncomes(userId);
        const getMonthlyExpenses = await monthlyExpenses(userId);

        return res.status(200).json({
            totalIncomes: parseFloat(getTotalIncomes),
            totalExpenses: parseFloat(getTotalExpenses),
            totalInvestments: parseFloat(getTotalInvestments),
            totalBalance: parseFloat(getTotalIncomes) - parseFloat(getTotalExpenses) - parseFloat(getTotalInvestments),
            last30DaysIncome: {
                totalIncomes: getLast60DaysOfIncomes?.reduce((total, current) => total + parseFloat(current.income), 0),
                transactions: getLast60DaysOfIncomes,
            },
            last30DaysExpenses: {
                totalExpenses: getLast30DaysOfExpenses?.reduce(
                    (total, current) => total + parseFloat(current.expense),
                    0,
                ),
                transactions: getLast30DaysOfExpenses,
            },
            recentTransactions: getLast10Transactions,
            monthlyIncomes: {
                totalIncomes: getMonthlyIncomes?.reduce((total, current) => total + parseFloat(current.income), 0),
                totalCategoryIncomes: getMonthlyIncomes,
            },
            monthlyExpenses: {
                totalExpenses: getMonthlyExpenses?.reduce((total, current) => total + parseFloat(current.expense), 0),
                totalCategoryExpenses: getMonthlyExpenses,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Error obtaining the dashboard data" });
    }
};

module.exports = getUserDashboard;
