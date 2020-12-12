var express = require('express');
var router = express.Router();

var authController = require('../Controllers/AuthController');
var simpleController = require('../Controllers/SimpleController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/validate', authController.validate_token);

router.get('/', function(req, res){ res.send('Hello World!'); });

var authMiddleWare = require('../Middleware/authMiddleware');
router.get('/hello', authMiddleWare.Validate, simpleController.simple_hello);

module.exports = router;