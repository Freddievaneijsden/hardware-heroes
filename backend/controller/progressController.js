const progressService = require('../service/progressService');

async function getProgressByUserId(req, res) {
    let {userId} = req.params;

    if (!userId) {
         return res.status(400).json({
            success: false, 
            error: "UserId must be included"
        })
    }

    try {
        let result = await progressService.getProgressByUserId(userId);
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
    getProgressByUserId
}