const loginService = require('../service/loginService');

async function getUserByName(req, res) {
    let {userName} = req.params;

    if (!userName) {
         return res.status(400).json({
            success: false, 
            error: "Username must be included"
        })
    }

    try {
        let result = await loginService.getUserByName(userName);
        return res.status(200).json({
            success: true, 
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            error: error.message
        })
    }
}

module.exports = {
    getUserByName
}