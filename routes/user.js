const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userControllers');
const checkAuth = require('../middleware/checkAuth');

router.post("/signup", UserController.userSignup);

router.post("/login", UserController.userLogin);

router.delete("/:userId",checkAuth, UserController.userDelete);

module.exports = router;