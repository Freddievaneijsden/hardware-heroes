const express = require('express');
const router = express.Router(); 
const progressController = require('../controller/progressController');

router.get('/users/progress/:userId', progressController.getProgressByUserId);
router.post('/users/progress', progressController.createProgress)

module.exports = router;