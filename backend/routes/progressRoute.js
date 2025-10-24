const express = require('express');
const router = express.Router(); 
const progressController = require('../controller/progressController');

router.get('/users/progress/:userId', progressController.getProgressByUserId);

module.exports = router;