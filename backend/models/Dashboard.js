const db = require("../config/db/db");
const { requestIncomes } = require("./Income");

// Query for obtain SUM of incomes
const totalIncomes = (id, callback) => {
    const sql = `SELECT user_id, SUM(income) FROM incomes WHERE user_id = $1 GROUP BY user_id ORDER BY SUM(income)`;
    db.oneOrNone(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain SUM of expenses
const totalExpenses = (id, callback) => {
    const sql = `SELECT user_id, SUM(expense) FROM expenses WHERE user_id = $1 GROUP BY user_id ORDER BY SUM(expense)`;
    db.oneOrNone(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain SUM of incomes
const totalInvestments = (id, callback) => {
    const sql = `SELECT user_id, SUM(investment) FROM investments WHERE user_id = $1 GROUP BY user_id ORDER BY SUM(investment)`;
    db.oneOrNone(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain last 60 days of incomes
const last60DaysIncomes = (id, callback) => {
    const sql = `SELECT * FROM incomes WHERE user_id = $1 AND income_date >= CURRENT_DATE - INTERVAL '6 months' ORDER BY income_date DESC`;
    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain last 60 days of incomes
const last30DaysExpenses = (id, callback) => {
    const sql = `SELECT * FROM expenses WHERE user_id = $1 AND expense_date >= CURRENT_DATE - INTERVAL '3 months' ORDER BY expense_date DESC`;
    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain all transactions
const allTransactions = (id, callback) => {
    const sql = `SELECT user_id, category, income, income_date AS date, 'income' AS type FROM incomes AS i
WHERE i.user_id = $1
UNION ALL
SELECT user_id, category, expense, expense_date AS date, 'expense' AS type FROM expenses AS e
WHERE e.user_id = $1
UNION ALL
SELECT user_id, category, investment, investment_date AS date, 'investment' AS type FROM investments AS inv
WHERE inv.user_id = $1
ORDER BY type ASC
LIMIT 10`;

    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = { totalIncomes, totalExpenses, totalInvestments, last60DaysIncomes, last30DaysExpenses, allTransactions };
