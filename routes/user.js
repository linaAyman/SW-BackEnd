const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userControllers');
const checkAuth = require('../middleware/checkAuth');

router.post("/signup", UserController.userSignup);
router.post("/login", UserController.userLogin);
router.delete("/:userId",checkAuth, UserController.userDelete);
router.post("/logout" ,checkAuth,  UserController.userLogout);
router.get("/mailExist/:mail" , UserController.userMailExist);
router.get("/user",checkAuth, UserController.getCurrentUser);
router.get("/users/:id",checkAuth,UserController.getOtherUser);
module.exports = router;