const express = require('express');
const router = express.Router();
const articleController = require('../controller/articleController');

router.get('/articles/component/:componentId', articleController.getArticlesByComponent);
router.get('/articles/component/:componentId/chapter/:chapterId', articleController.getArticleByComponentAndChapter);

module.exports = router;