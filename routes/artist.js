const express = require('express');
const router = express.Router();

const ArtistController = require('../controllers/artistController');

router.get('/:id',ArtistController.getArtist);
router.get('/:id/about',ArtistController.artistAbout);

module.exports = router;