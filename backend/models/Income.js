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
const editIncome = (income, id, callback) => {
    const keys = Object.keys(income);
    const properties = keys.map((key, index) => `${key} = $${index + 1}`).join(",");
    const values = keys.map((key) => income[key]);

    const sql = `UPDATE incomes SET ${properties} WHERE incomes_id = $${keys.length + 1}  returning *`;
    db.one(sql, [...income, id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for delete an income
const removeIncome = (id, callback) => {
    const sql = `DELETE FROM incomes WHERE income_id = $1`;
    db.none(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = { requestIncomes, createIncome, editIncome, removeIncome };

const info = { user_id: "1", category: "perro", income: 1230, income_date: "date" };
