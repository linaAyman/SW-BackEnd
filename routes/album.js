const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const AlbumController = require('../controllers/albumController');
const checkAuth=require('../middleware/checkAuth')

router.get('/:id', AlbumController.getAlbum);
router.get('/:id/tracks', AlbumController.getTracks);
router.post("/addAlbum",checkAuth,upload.upload.fields([{name:"music", maxCount: 50},{name: 'image', maxCount: 10}]),AlbumController.addAlbum);
router.post("/editAlbum/:albumId",checkAuth,upload.upload.fields([{name:"music", maxCount: 50},{name: 'image', maxCount: 10}]),AlbumController.editAlbum);//just edit info for each track in the album and the album itself
router.post("/addTrack/:albumId",checkAuth,upload.upload.fields([{name:"music", maxCount: 1},{name: 'image', maxCount: 1}]),AlbumController.addTrack);//add track to album(id)
router.delete("/removeTrack/:trackId/:albumId",checkAuth,AlbumController.removeTrack);  //remove track to album(id)
router.delete("/deleteAlbum/:albumId",checkAuth, AlbumController.deleteAlbum);
module.exports = router;
