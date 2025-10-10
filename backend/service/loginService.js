const connectionMySQL = require('../database/connectionMySQL');

async function getUserByName(userName) {
    let sql = "SELECT * FROM users WHERE userName = ?";
    let params = [userName];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows[0];
}