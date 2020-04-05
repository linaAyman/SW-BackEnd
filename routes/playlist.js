const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const playlistController = require('../controllers/playlistController');

router.get('/:id', playlistController.getPlaylist);
router.post('/tracks' ,checkAuth,playlistController.addTrack);

module.exports = router;
