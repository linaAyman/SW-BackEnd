const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const playlistController = require('../controllers/playlistController');

router.get('/:id/tracks',playlistController.getAllTracks);
router.get('/:id', playlistController.getPlaylist);
router.post('/:id/tracks' ,checkAuth,playlistController.addTrack);

module.exports = router;
