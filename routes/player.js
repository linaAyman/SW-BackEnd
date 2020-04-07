const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');
const checkAuth = require('../middleware/checkAuth');


<<<<<<< HEAD
//router.post('/save-played-track',checkAuth,playerController.saveTrack);
router.get('/play/:id',checkAuth,playerController.playFirstTrack);
=======
router.post('/save-played-track',checkAuth,playerController.saveTrack);
router.post('/play/:id',checkAuth,playerController.playTrack);
>>>>>>> 4be7cd7a9cdff53ed661ccc3dc642c37a1551215

module.exports = router;