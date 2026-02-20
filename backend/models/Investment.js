const db = require("../config/db/db");

// Query for obtain all investments
const requestInvestments = (id, callback) => {
    const sql = `SELECT user_id FROM users AS u WHERE user_id = $1 JOIN investments AS in ON u.user_id = in.user_id`;
    db.any(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for add an investment
const createInvestment = (investment, callback) => {
    const keys = Object.keys(investment);
    const properties = keys.join(",");
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(",");
    const values = keys.map((key) => investment[key]);

    const sql = `INSERT INTO investments(${properties}) VALUES ${placeholders} returning *`;
    db.one(sql, values)
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for modify an investment
const editInvestment = (investment, id, callback) => {
    const keys = Object.keys(investment);
    const properties = keys.map((key, index) => `${key} = $${index + 1}`).join(",");
    const values = keys.map((key) => investment[key]);

    const sql = `UPDATE investments SET ${properties} WHERE investment_id = $${keys.length + 1}  returning *`;
    db.one(sql, [...investment, id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for delete an investment
const removeInvestment = (id, callback) => {
    const sql = `DELETE FROM investment WHERE expense_id = $1`;
    db.none(sql, [id])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = { requestInvestments, createInvestment, editInvestment, removeInvestment };
