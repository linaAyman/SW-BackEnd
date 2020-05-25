const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const trackController = require("../controllers/trackController");
const upload = require("../middleware/multer");



router.post("/upload", upload.upload.single("music"), trackController.uploadSong);
router.delete("/:trackId", trackController.deleteTrack);
router.get("/:trackId",trackController.getTrack );
router.post("/edit/:trackId",upload.upload.single("music"),trackController.editTrack );//maybe upload modifed song
router.get('/:genre', checkAuth, trackController.showByGenre);

module.exports = router;