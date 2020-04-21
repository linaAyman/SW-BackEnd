const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');
const checkAuth = require('../middleware/checkAuth');

router.get('/',checkAuth,searchController.search);

module.exports = router;