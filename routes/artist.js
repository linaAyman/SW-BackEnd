const express = require('express');
const router = express.Router();

const ArtistController = require('../controllers/artistController');

router.get('/:id',ArtistController.getArtist);
router.get('/:id/about',ArtistController.artistAbout);
router.get('/:id/related-artists',ArtistController.getrelatedArtist);
router.get("/:artistId/top-tracks", ArtistController.artistTopTracks);
module.exports = router;