const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const checkAuth=require('../middleware/checkAuth')

router.get('/',homeController.getHome);


router.get('/Most%20Popular%20Playlists',homeController.seeMoreMostPopular);
router.get('/Released%20Albums',homeController.getReleasedAlbums)
router.get('/recently-played',checkAuth,homeController.getPlayHistory);
router.get('/:name',homeController.seeMoreCategories);


module.exports = router;
