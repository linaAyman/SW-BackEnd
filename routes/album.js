const express = require('express');
const router = express.Router();

const AlbumController = require('../controllers/albumController');
const checkAuth=require('../middleware/checkAuth')

router.get('/:id', AlbumController.getAlbum);
router.get('/:id/tracks', AlbumController.getTracks);

module.exports = router;
