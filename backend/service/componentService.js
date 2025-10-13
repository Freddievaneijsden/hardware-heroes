const connectionMySQL = require('../database/connectionMySQL');

async function getComponents() {
    let sql = "SELECT * FROM component";

    let [rows] = await connectionMySQL.promise().query(sql); 
    return rows; 
}

async function getComponentById(componentId) {
    let sql = "SELECT * FROM component WHERE componentId = ?";
    let params = [componentId];

    let [rows] = await connectionMySQL.promise().query(sql, params);
    return rows;
}

module.exports = {
    getComponents,
    getComponentById
}
