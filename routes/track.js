const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const trackController = require("../controllers/trackController");
const upload = require("../middleware/multer");


router.post("/upload",checkAuth,upload.upload.fields([{name:"music", maxCount: 1},{name: 'image', maxCount: 1}]),trackController.uploadSong);
router.post("/edit/:trackId",checkAuth,upload.upload.fields([{name:"music", maxCount: 1},{name: 'image', maxCount: 1}]),trackController.editTrack );//maybe upload modifed song
router.delete("/:trackId", checkAuth,trackController.deleteTrack);
router.get("/:trackId",checkAuth,trackController.getTrack );
<<<<<<< HEAD
router.get('/genre/:genre', trackController.showByGenre);
=======

router.get('genre/:genre', trackController.showByGenre);
>>>>>>> af3c66bece6601a85ece29c3b0449bee9a56c3eb

module.exports = router;
