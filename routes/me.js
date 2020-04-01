const express = require('express');
const router  = express.Router();

const trackController= require('../controllers/trackController')
const checkAuth      = require('../middleware/checkAuth')

//Like and dislike a track
router.put('/tracks', checkAuth,trackController.likeSong);
router.delete('/tracks',checkAuth, trackController.dislikeSong);

module.exports = router;