const db = require("../config/db/db");

// Query for obtain all incomes
const requestIncomes = (id, callback) => {
    const sql = `SELECT incomes_id, category, income, income_date FROM incomes WHERE user_id = $1`;
    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for add an income
const createIncome = (income, callback) => {
    const keys = Object.keys(income);
    const properties = keys.join(",");
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(",");
    const values = keys.map((key) => income[key]);

    const sql = `INSERT INTO incomes(${properties}) VALUES (${placeholders}) returning *`;
    db.one(sql, values)
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for modify an income
const editIncome = (income, id, userid, callback) => {
    const keys = Object.keys(income);
    const properties = keys.map((key, index) => `${key} = $${index + 1}`).join(",");
    const values = keys.map((key) => income[key]);

    const sql = `UPDATE incomes SET ${properties} WHERE incomes_id = $${keys.length + 1} AND user_id = $${keys.length + 2} returning *`;
    db.one(sql, [...values, id, userid])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for delete an income
const removeIncome = (incomeId, userId, callback) => {
    const sql = `DELETE FROM incomes WHERE incomes_id = $1 AND user_id = $2 returning incomes_id`;
    db.oneOrNone(sql, [incomeId, userId])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = { requestIncomes, createIncome, editIncome, removeIncome };
