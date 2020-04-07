const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const playlistController = require('../controllers/playlistController');

router.get('/:id/tracks',playlistController.getAllTracks);
router.get('/:id', playlistController.getPlaylist);
router.post('/tracks' ,checkAuth,playlistController.addTrack);

<<<<<<< HEAD

module.exports = router;
=======
module.exports = router;
>>>>>>> 4be7cd7a9cdff53ed661ccc3dc642c37a1551215
