//create new expree router 


const express=require('express'),
router=express.Router();
//import main controller here 
maincontroller=require('./controllers/main.controller');
userController=require('./controllers/users.controller');



module.exports=router;
//you routes should be sth like that 
//router.get('/users',userController.showEvents);
//router.get('/',maincontroller.showHome);
//router.get('/users',userController.showEvents);

