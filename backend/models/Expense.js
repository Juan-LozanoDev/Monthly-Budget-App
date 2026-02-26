const db = require("../config/db/db");

// Query for obtain all expenses
const requestExpenses = (id, callback) => {
    const sql = `SELECT expenses_id, category, expense, expense_date FROM expenses WHERE user_id = $1`;
    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for add an expense
const createExpense = (expense, callback) => {
    const keys = Object.keys(expense);
    const properties = keys.join(",");
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(",");
    const values = keys.map((key) => expense[key]);

    const sql = `INSERT INTO expenses(${properties}) VALUES (${placeholders}) returning *`;
    db.one(sql, values)
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for modify an expense
const editExpense = (expense, id, userid, callback) => {
    const keys = Object.keys(expense);
    const properties = keys.map((key, index) => `${key} = $${index + 1}`).join(",");
    const values = keys.map((key) => expense[key]);

    const sql = `UPDATE expenses SET ${properties} WHERE expenses_id = $${keys.length + 1} AND user_id = $${keys.length + 2} returning *`;
    db.one(sql, [...values, id, userid])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for delete an expense
const removeExpense = (expenseId, userId, callback) => {
    const sql = `DELETE FROM expenses WHERE expenses_id = $1 AND user_id = $2 returning expenses_id`;
    db.oneOrNone(sql, [expenseId, userId])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = { requestExpenses, createExpense, editExpense, removeExpense };
