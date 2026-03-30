const db = require("../config/db/db");

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

// Query for obtain last 30 days of incomes
const last30DaysIncomes = (id, callback) => {
    const sql = `SELECT * FROM incomes WHERE user_id = $1 AND income_date >= CURRENT_DATE - INTERVAL '1 months' ORDER BY income_date DESC`;
    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain last 30 days of expenses
const last30DaysExpenses = (id, callback) => {
    const sql = `SELECT * FROM expenses WHERE user_id = $1 AND expense_date >= CURRENT_DATE - INTERVAL '1 months' ORDER BY expense_date DESC`;
    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain expenses of the current month
const currentMonthIncomes = (id, callback) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    let stringMonth = "0";
    if (currentMonth < 10) {
        stringMonth = stringMonth.concat(currentMonth.toLocaleString());
    } else {
        stringMonth = currentMonth.toLocaleString();
    }

    const sql = `SELECT category, SUM(income) AS income FROM INCOMES
WHERE TO_CHAR(income_date, 'MM') = $1 AND user_id = $2
GROUP BY category`;

    db.any(sql, [stringMonth, id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain expenses of the current month
const currentMonthExpenses = (id, callback) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    let stringMonth = "0";
    if (currentMonth < 10) {
        stringMonth = stringMonth.concat(currentMonth.toLocaleString());
    } else {
        stringMonth = currentMonth.toLocaleString();
    }

    const sql = `SELECT category, SUM(expense) AS expense FROM EXPENSES
WHERE TO_CHAR(expense_date, 'MM') = $1 AND user_id = $2
GROUP BY category`;

    db.any(sql, [stringMonth, id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for obtain all transactions
const allTransactions = (id, callback) => {
    const sql = `SELECT user_id, category, income AS amount, income_date AS date, 'income' AS type FROM incomes AS i
WHERE i.user_id = $1
UNION ALL
SELECT user_id, category, expense AS amount, expense_date AS date, 'expense' AS type FROM expenses AS e
WHERE e.user_id = $1
UNION ALL
SELECT user_id, category, investment AS amount, investment_date AS date, 'investment' AS type FROM investments AS inv
WHERE inv.user_id = $1
ORDER BY date DESC
LIMIT 10`;

    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = {
    totalIncomes,
    totalExpenses,
    totalInvestments,
    last30DaysIncomes,
    last30DaysExpenses,
    currentMonthIncomes,
    currentMonthExpenses,
    allTransactions,
};
