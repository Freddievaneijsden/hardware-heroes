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

async function createProgress (req, res) {
    let {progressUserId, progressChapterId} = req.body;

       if (progressUserId == null || progressChapterId == null)
         {
            return res.status(400).json({
                success: false, 
                error: "UserId and chapter are required"
            })
        }
    
        if (progressChapterId < 0 || progressChapterId > 5 ){
             return res.status(400).json({
                success: false, 
                error: "ProgressChapterId must be 0 - 5"
            })
        }
        
        try {
            let result = await progressService.createProgress(progressUserId, progressChapterId)
            return res.status(201).json({
                success: true, 
                data: result,
                message: 'You have created a progress!'
            })
    
        } catch (error) {
             return res.status(500).json({
                success: false, 
                error: error.message
             });
        }
}

async function updateProgressChapterIdByUserId (req, res) {
    let {progressChapterId} = req.body;
    let {userId} = req.params;

       if (!progressChapterId || !userId) {
            return res.status(400).json({
                success: false, 
                error: "All fields are required"
            })
        }
    
        if (progressChapterId < 1 || progressChapterId > 5 ){
             return res.status(400).json({
                success: false, 
                error: "ProgressChapterId must be 1 - 5"
            })
        }
        
        try {
            let result = await progressService.updateProgressChapter(progressChapterId, userId);
            return res.status(201).json({
                success: true, 
                data: result,
                message: 'You have updated a progress!'
            })
    
        } catch (error) {
             return res.status(500).json({
                success: false, 
                error: error.message
             });
        }
}

module.exports = {
    getProgressByUserId,
    createProgress,
    updateProgressChapterIdByUserId
}