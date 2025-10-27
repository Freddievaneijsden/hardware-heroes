const connectionMySQL = require('../database/connectionMySQL');

async function getquizzes() {
    let sql = "SELECT * FROM quiz";

    let [rows] = await connectionMySQL.promise().query(sql); 
    return rows; 
}

async function getquizById(quizId) {
    let sql = "SELECT * FROM quiz WHERE quizChapterId = ?";
    let params = [quizId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

module.exports = {
    getquizzes,
    getquizById
}
