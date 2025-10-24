const connectionMySQL = require('../database/connectionMySQL');

async function getProgressByUserId(userId) {
    let sql = "SELECT users.userName, progress.progressId, progress.progressUserId, progress.progressChapterId FROM progress INNER JOIN users ON progress.progressUserId = users.userId WHERE users.userId = ?";
    let params = [userId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

async function createProgress(progressUserId, progressChapterId) {
    let sql = "INSERT INTO progress (progressUserId, progressChapterId) VALUES (?, ?)"
    let params = [progressUserId, progressChapterId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

module.exports = {
    getProgressByUserId,
    createProgress
}