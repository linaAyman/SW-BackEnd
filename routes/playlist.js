const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const playlistController = require('../controllers/playlistController');

router.get('/:id/tracks',playlistController.getAllTracks);
router.get('/:id', playlistController.getPlaylist);
router.post('/tracks' ,checkAuth,playlistController.addTrack);
// router.put("/createPlaylist",checkAuth,playlistController.createPlaylist);
router.delete('/:id/tracks' ,playlistController.removeTrack);


module.exports = router;
