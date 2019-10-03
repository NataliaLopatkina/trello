const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');

router.post('/', registrationController.createUser)

module.exports = router;
