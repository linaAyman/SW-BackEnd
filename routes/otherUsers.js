const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userControllers');
const checkAuth = require('../middleware/checkAuth');

router.get("/:id",checkAuth,UserController.getOtherUser);
module.exports = router;