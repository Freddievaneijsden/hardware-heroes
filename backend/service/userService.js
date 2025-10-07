const connectionMySQL = require('../database/connectionMySQL');

async function getUsers() {
    let sql = "SELECT * FROM users";

    let [rows] = await connectionMySQL.promise().query(sql); 
    return rows; 
}

async function createUser(userName, userPassword, rolesId) {
    let sql = "INSERT INTO users (userName, userPassword, rolesId) VALUES (?,?,?)";
    let params = [userName, userPassword, rolesId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

async function getUserById(userId) {
    let sql = "SELECT * FROM users WHERE userId = ?";
    let params = [userId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

async function updateUser(userName, userPassword, rolesId, userId) {
    let sql = "UPDATE users SET userName = ?, userPassword = ?, rolesId = ? WHERE userId = ?";
    let params = [userName, userPassword, rolesId, userId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}


async function deleteUser(userId) {
    let sql = "DELETE FROM users WHERE userId = ?";
    let params = [userId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}




