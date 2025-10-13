const express = require('express');
const router = express.Router(); 
const loginController = require('../controller/loginController');
const authenticateToken = require('../middleware/auth')

router.post('/login/user', loginController.getUserByName);

module.exports = router;