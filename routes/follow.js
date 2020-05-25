const express = require('express');
const router = express.Router();

const FollowController = require('../controllers/followController');
const checkAuth = require('../middleware/checkAuth');

router.put('/:id', checkAuth, FollowController.addFollow);
router.get('/:id', checkAuth, FollowController.getFollowingIds);

module.exports = router;