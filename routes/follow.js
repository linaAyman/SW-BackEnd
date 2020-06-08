const express = require('express');
const router = express.Router();

const FollowController = require('../controllers/followController');
const checkAuth = require('../middleware/checkAuth');

router.put('/:id', checkAuth, FollowController.addFollow);
router.get('/', checkAuth, FollowController.getFollowIds);
router.delete('/:id', checkAuth, FollowController.unfollow);

module.exports = router;