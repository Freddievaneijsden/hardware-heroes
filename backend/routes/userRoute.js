const express = require('express');
const router = express.Router(); 
const userController = require('../controller/userController');

router.get('/users/with-progress', userController.getUsersWithProgress)
router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.patch('/users/:userId', userController.updateUser)

module.exports = router;