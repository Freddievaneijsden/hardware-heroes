const express = require('express');
const router = express.Router(); 
const quizController = require('../controller/quizController');

router.get('/quizzes', quizController.getquizzes);
router.get('/quizzes/:chapterId', quizController.getquizByChapterId);

module.exports = router;