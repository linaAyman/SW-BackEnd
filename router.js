const express = require ('express')
const router  =  express.Router()
const userController =require('./controllers/userControllers');

router.get('/' , userController.home);

router.post('/login' , userController.login );
router.post('/logout' , userController.logout );
router.post('/register' ,  userController.register);

router.get('/search',searchController.search);
router.get('/artist/:id', artistController.getArtist);

module.exports = router;