const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const checkAuth=require('../middleware/checkAuth')

router.get('/',homeController.getHome);
router.get('/:name',homeController.seeAll);

//router.get('/',homeController.getHome);
//router.get('/Category/:name',homeController.seeAllCategory);
/*get/allPopularPlaylists
get/newReleases*/
//router.get('/allPopularPlaylists',homeController.getMostPopular);
///router.get('/newReleases',homeController.getNewReleases);

module.exports = router;
