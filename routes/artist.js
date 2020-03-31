const express = require('express');
const router = express.Router();

const ArtistController = require('../controllers/artistController');

router.get('',ArtistController.getArtist);

module.exports = router;