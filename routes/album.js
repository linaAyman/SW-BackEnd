const express = require('express');
const router = express.Router();

const AlbumController = require('../controllers/playlistController');

router.get('/:albumId', AlbumController.getAlbum);

module.exports = router;