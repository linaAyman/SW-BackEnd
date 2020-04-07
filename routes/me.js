const express = require('express');
const router  = express.Router();

const trackController= require('../controllers/trackController')
const checkAuth      = require('../middleware/checkAuth')

//Like and dislike a track
router.put('/tracks', checkAuth,trackController.likeSong);
router.delete('/tracks',checkAuth, trackController.dislikeSong);
<<<<<<< HEAD
router.get('/tracks',checkAuth,trackController.getlikedSong)
=======
router.get('/tracks',checkAuth,trackController.getlikedSong);
>>>>>>> 48b86c69fb4275705edf78425d14aa4e82e29dce

module.exports = router;
