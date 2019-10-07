const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search-boards.controller');

router.get('/', searchController.searchBoards)

module.exports = router;
