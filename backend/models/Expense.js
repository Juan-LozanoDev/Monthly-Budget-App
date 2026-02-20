const db = require("../config/db/db");

// Query for obtain all expenses
const requestExpenses = (id, callback) => {
    const sql = `SELECT user_id FROM users AS u WHERE user_id = $1 JOIN expenses AS e ON u.user_id = e.user_id`;
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

    const sql = `INSERT INTO expenses(${properties}) VALUES ${placeholders} returning *`;
    db.one(sql, values)
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for modify an expense
const editExpense = (expense, id, callback) => {
    const keys = Object.keys(expense);
    const properties = keys.map((key, index) => `${key} = $${index + 1}`).join(",");
    const values = keys.map((key) => expense[key]);

    const sql = `UPDATE expenses SET ${properties} WHERE expense_id = $${keys.length + 1}  returning *`;
    db.one(sql, [...expense, id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for delete an expense
const removeExpense = (id, callback) => {
    const sql = `DELETE FROM expenses WHERE expense_id = $1`;
    db.none(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = { requestExpenses, createExpense, editExpense, removeExpense };
