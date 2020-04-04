const express = require('express');
const router = express.Router();

const AlbumController = require('../controllers/albumController');

router.get('/:id', AlbumController.getAlbum);

module.exports = router;