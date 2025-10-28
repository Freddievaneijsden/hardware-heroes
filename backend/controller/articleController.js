const articleService = require('../service/articleService');

async function getArticlesByComponent(req, res) {
    let {componentId} = req.params;

    if (!componentId) {
         return res.status(400).json({
            success: false, 
            error: "ComponentId must be included"
        })
    }

    try {
        let result = await articleService.getArticlesByComponent(componentId);

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

async function getArticleByComponentAndChapter(req, res) {
    let {componentId, chapterId} = req.params;

    if (!componentId) {
         return res.status(400).json({
            success: false, 
            error: "ComponentId must be included"
        })
    }

    if (!chapterId) {
         return res.status(400).json({
            success: false, 
            error: "ChapterId must be included"
        })
    }

    try {
        let result = await articleService.getArticleByComponentAndChapter(componentId, chapterId);
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
    getArticlesByComponent,
    getArticleByComponentAndChapter
}