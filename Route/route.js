const express = require('express');
const router = express.Router();

const simpleController = require('../Controllers/SimpleController');

router.get('/simple', simpleController.test);

module.exports = router;