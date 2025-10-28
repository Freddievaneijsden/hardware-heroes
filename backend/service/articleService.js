const connectionMySQL = require('../database/connectionMySQL');

async function getArticlesByComponent(componentId) {
    let sql = "SELECT * FROM article WHERE articleComponentId = ?";
    let params = [componentId]
    let [rows] = await connectionMySQL.promise().query(sql, params); 
    return rows; 
}

async function getArticleByComponentAndChapter(componentId, chapterId) {
    let sql = "SELECT * FROM article WHERE articleComponentId = ? AND articleChapterId = ?";
    let params = [componentId, chapterId];
    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

module.exports = {
    getArticlesByComponent,
    getArticleByComponentAndChapter
}