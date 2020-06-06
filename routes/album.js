const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const AlbumController = require('../controllers/albumController');
const checkAuth=require('../middleware/checkAuth')

router.get('/:id', AlbumController.getAlbum);
router.get('/:id/tracks', AlbumController.getTracks);

router.delete("/deleteAlbum/:albumId",checkAuth, AlbumController.deleteAlbum);
router.post("/addAlbum",checkAuth,upload.upload.fields([{name:"music", maxCount: 50},{name: 'image', maxCount: 10}]),AlbumController.addAlbum);
router.post("/editAlbum/:albumId",checkAuth,upload.upload.fields([{name:"music", maxCount: 50},{name: 'image', maxCount: 10}]),AlbumController.editAlbum);//just edit info for each track in the album and the album itself
module.exports = router;
