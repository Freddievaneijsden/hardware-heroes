const express = require('express');
const router = express.Router(); 
const componentController = require('../controller/componentController');

router.get('/components', componentController.getComponents);
router.get('/components/:componentId', componentController.getComponentById);

module.exports = router;