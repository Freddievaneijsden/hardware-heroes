const quizService = require('../service/quizService');

async function getquizzes(req, res) {

    try {
        let result = await quizService.getquizzes();

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

async function getquizByChapterId(req, res) {
    let {chapterId} = req.params;

    if (!chapterId) {
         return res.status(400).json({
            success: false, 
            error: "ChapterId must be included"
        })
    }

    try {
        let result = await quizService.getquizByChapterId(chapterId);
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
    getquizzes,
    getquizByChapterId
}