const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const registrationSchema = require('../joi/registration-schema');
const joiValidation = require('../middelwares/joi-validation');

router.post('/', joiValidation(registrationSchema, 'body'), authController.registration)

module.exports = router;
