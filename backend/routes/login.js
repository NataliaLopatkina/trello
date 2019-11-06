const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const loginSchema = require('../joi/login-schema');
const joiValidation = require('../middelwares/joi-validation');

router.post('/', joiValidation(loginSchema, 'body'),authController.login)

module.exports = router;
