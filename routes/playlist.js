const express = require('express');
const router = express.Router();

const playlistController = require('../controllers/playlistController');

router.get('/:id/tracks',playlistController.getAllTracks);
router.get('/:id', playlistController.getPlaylist);


module.exports = router;