const express = require('express');
const router = express.Router();


//  Import Controllers Here.
const simpleController = require('../Controller/SimpleController');
const authController = require('../Controller/Authentication/AuthController');


//  Routes.
router.get('/simple', simpleController.test);
router.post('/auth/signup', authController.signup);



module.exports = router;