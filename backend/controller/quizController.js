const quizService = require('../service/quizService');

async function getquizzes(req, res) {

    try {
        let result = await quizService.getquizes();

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

async function getquizById(req, res) {
    let {quizId} = req.params;

    if (!quizId) {
         return res.status(400).json({
            success: false, 
            error: "QuizId must be included"
        })
    }

    try {
        let result = await quizService.getquizById(quizId);
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
    getquizById
}