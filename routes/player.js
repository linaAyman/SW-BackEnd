const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');
const checkAuth = require('../middleware/checkAuth');

router.post('/save-played-track/:id',checkAuth,playerController.saveTrack);
router.get('/play/:id',checkAuth,playerController.playFirstTrack);

module.exports = router;
