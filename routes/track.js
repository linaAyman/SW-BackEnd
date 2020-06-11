const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const trackController = require("../controllers/trackController");
const upload = require("../middleware/multer");


router.post("/upload",checkAuth,upload.upload.fields([{name:"music", maxCount: 1},{name: 'image', maxCount: 1}]),trackController.uploadSong);
router.post("/edit/:trackId",checkAuth,upload.upload.fields([{name:"music", maxCount: 1},{name: 'image', maxCount: 1}]),trackController.editTrack );//maybe upload modifed song
router.delete("/:trackId", checkAuth,trackController.deleteTrack);
router.get("/:trackId",checkAuth,trackController.getTrack );
router.get('/genre/:genre', trackController.showByGenre);

module.exports = router;
