const db = require("../config/db/db");

// Query for verify that the email doesn't exists on the database
const verifyEmail = async (email) => {
    const sql = `SELECT email FROM users WHERE email = $1 LIMIT 1`;

    const result = await db.oneOrNone(sql, [email]);

    return !!result;
};

// Query for create the user on the database
const createUser = (user, callback) => {
    const keys = Object.keys(user);
    const properties = keys.join(",");
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(",");
    const values = keys.map((key) => user[key]);

    const sql = `INSERT INTO users (${properties}) VALUES (${placeholders}) returning *`;
    db.one(sql, values)
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

// Query for login the user
const requestAccount = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = $1 LIMIT 1";
    db.oneOrNone(sql, [email])
        .then((result) => {
            callback(null, result);
        })
        .catch((error) => {
            callback(error);
        });
};

module.exports = { createUser, verifyEmail, requestAccount};
