const express = require('express');
const router  = express.Router();

const trackController= require('../controllers/trackController')
const albumController=require('../controllers/albumController')
const playlistController=require('../controllers/playlistController')
const libraryController=require('../controllers/libraryController')
const checkAuth      = require('../middleware/checkAuth')

//Like and dislike a track
router.put('/tracks', checkAuth,trackController.likeSong);
router.delete('/tracks',checkAuth, trackController.dislikeSong);
router.get('/tracks',checkAuth,trackController.getlikedSong);
//Like and dislike an album
router.put('/albums',checkAuth,albumController.likeAlbum);
router.delete('/albums',checkAuth,albumController.dislikeAlbum);
router.get('/albums',checkAuth,libraryController.getLikedAlbums);
//Like and dislike a playlist
router.put('/playlists',checkAuth,playlistController.likePlaylist);
router.delete('/playlists',checkAuth,playlistController.deletePlaylist);
router.get('/playlists',checkAuth,libraryController.getLikedPlaylists);

module.exports = router;
