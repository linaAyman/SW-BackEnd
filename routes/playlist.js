const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const playlistController = require('../controllers/playlistController');
const upload = require("../middleware/multer");

router.get('/:id/tracks',playlistController.getAllTracks);
router.get('/:id', playlistController.getPlaylist);
router.post('/tracks' ,checkAuth,playlistController.addTrack);
// router.put("/createPlaylist",checkAuth,playlistController.createPlaylist);
router.delete('/:id/tracks' ,playlistController.removeTrack);
router.post('/:id' ,checkAuth,upload.upload.fields([{name: 'image', maxCount: 1}]),playlistController.editplaylist);// id for playlist id

module.exports = router;
