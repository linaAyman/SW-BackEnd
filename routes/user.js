const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userControllers');
const checkAuth = require('../middleware/checkAuth');
const playlistController=require('../controllers/playlistController');



router.post("/createPlaylist",checkAuth,playlistController.createPlaylist);
router.post("/signup", UserController.userSignup);
router.post("/signupArtist", UserController.userSignupArtist);
router.post("/login", UserController.userLogin);
router.delete("/:id",checkAuth, UserController.userDelete);
router.post("/logout" ,checkAuth,  UserController.userLogout);
router.get("/mailExist/:mail" , UserController.userMailExist);
router.get("/verify" ,checkAuth, UserController.userVerifyMail);
router.post("/changePassword" ,checkAuth, UserController.userChangePassword);
router.get("/forgetPassword/:email" , UserController.userForgetPassword);
router.post("/resetPassword"  ,UserController.userResetPassword);
router.get("/user",checkAuth, UserController.getCurrentUser);
router.get("/users/:id",checkAuth,UserController.getOtherUser);
router.post("/editprofile",checkAuth,UserController.editProfile);
router.get("",checkAuth, UserController.getCurrentUser);
router.get("/profile",checkAuth,UserController.getEditInfo);
module.exports = router;
