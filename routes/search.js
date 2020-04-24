const express = require('express');
const router = express.Router();

const searchController = require('../controllers/searchController');
const checkAuth = require('../middleware/checkAuth');

router.get('/',searchController.search);
router.post('/',checkAuth,searchController.saveSearch);
router.get('/recent-search',checkAuth,searchController.getRecentSearch);
router.delete('/',searchController.deleteSearch);
router.delete('/all',searchController.deleteAllSearch);

module.exports = router;