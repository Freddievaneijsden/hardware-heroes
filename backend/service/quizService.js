const connectionMySQL = require('../database/connectionMySQL');

async function getquizzes() {
    let sql = "SELECT * FROM quiz";

    let [rows] = await connectionMySQL.promise().query(sql); 
    return rows; 
}

async function getquizByChapterId(chapterId) {
    let sql = "SELECT * FROM quiz WHERE quizChapterId = ?";
    let params = [chapterId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

module.exports = {
    getquizzes,
    getquizByChapterId
}
