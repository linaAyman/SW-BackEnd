const express = require('express');
const router = express.Router();

const PlaylistController = require('../controllers/playlistController');

router.get('/:playlistId', PlaylistController.getPlaylist);

module.exports = router;