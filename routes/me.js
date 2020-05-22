const express = require('express');
const router  = express.Router();

const trackController= require('../controllers/trackController')
const albumController=require('../controllers/albumController')
const playlistController=require('../controllers/playlistController')
const checkAuth      = require('../middleware/checkAuth')

//Like and dislike a track
router.put('/tracks', checkAuth,trackController.likeSong);
router.delete('/tracks',checkAuth, trackController.dislikeSong);
router.get('/tracks',checkAuth,trackController.getlikedSong);
//Like and dislike an album
router.put('/albums',checkAuth,albumController.likeAlbum);
//Like and dislike a playlist
router.put('/playlists',checkAuth,playlistController.likePlaylist);

module.exports = router;
