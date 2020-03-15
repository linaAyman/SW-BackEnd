const express = require ('express')
const router  =  express.Router()
const userController =require('./controllers/userControllers');

router.get('/' , userController.home);
router.post('/signUp' , userController.signUp);
router.post('/login' , userController.login );
router.post('/logout' , userController.logout );

module.exports = router;