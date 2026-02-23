const db = require("../config/db/db");

// Query for obtain all investments
const requestInvestments = (id, callback) => {
    const sql = `SELECT investments_id, category, investment, investment_date FROM investments WHERE user_id = $1`;
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

    const sql = `INSERT INTO investments(${properties}) VALUES (${placeholders}) returning *`;
    db.one(sql, values)
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for modify an investment
const editInvestment = (investment, id, userid, callback) => {
    const keys = Object.keys(investment);
    const properties = keys.map((key, index) => `${key} = $${index + 1}`).join(",");
    const values = keys.map((key) => investment[key]);

    const sql = `UPDATE investments SET ${properties} WHERE investments_id = $${keys.length + 1} AND user_id = $${keys.length + 2} returning *`;
    db.one(sql, [...values, id, userid])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for delete an investment
const removeInvestment = (investmentId, userId, callback) => {
    const sql = `DELETE FROM investments WHERE investments_id = $1 AND user_id = $2 returning investments_id`;
    db.oneOrNone(sql, [investmentId, userId])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};


module.exports = { requestInvestments, createInvestment, editInvestment, removeInvestment };
