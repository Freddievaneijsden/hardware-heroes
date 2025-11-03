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

async function updateUser(updateData, userId) {
    let fields = [];
    let values = [];

    if (updateData.userName !== undefined) {
        fields.push("userName = ?");
        values.push(updateData.userName);
    }

    if (updateData.userPassword !== undefined) {
        fields.push("userPassword = ?");
        values.push(updateData.userPassword);
    } 

    if (updateData.rolesId !== undefined) {
        fields.push("rolesId = ?");
        values.push(updateData.rolesId);
    }

    if (fields.length === 0) {
        throw new Error ("No fields to update");
    }

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE userId = ?`;
    values.push(userId);

    const [rows] = await connectionMySQL.promise().query(sql, values);
    return rows;
}

async function deleteUser(userId) {
    let progressSql = "DELETE FROM progress WHERE progressUserId = ?";
    await connectionMySQL.promise().query(progressSql, [userId]);
    
    let userSql = "DELETE FROM users WHERE userId = ?";
    let [rows] = await connectionMySQL.promise().query(userSql, [userId]);
    return rows;
}

async function getUsersWithProgress() {
    let sql = `SELECT 
      u.userId,
      u.userName,
      u.rolesId,
      p.progressChapterId
    FROM users u
    LEFT JOIN progress p ON u.userId = p.progressUserId`

    let [rows] = await connectionMySQL.promise().query(sql);
    return rows;
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getUsersWithProgress
}




