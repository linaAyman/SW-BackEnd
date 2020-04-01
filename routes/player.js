const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');
const checkAuth = require('../middleware/checkAuth');


router.post('/save-played-track',checkAuth,playerController.saveTrack);

module.exports = router;