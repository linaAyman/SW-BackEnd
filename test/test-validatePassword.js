var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const  UserController = require('../controllers/userControllers')

describe("validateUserPassword",function(){
it('validateUserPassword Test#1', function() {
    let body ={
        newPassword: 'kokowawaa' ,
        confirmedPassword:'kokowawaa' 
           
    }
    let result = UserController.validateUserPassword(body)
     let msg;
     if(result.error!=  null){
            msg = 'Error happened in Test#1'
     }
     else{
            msg = 'Done'
     }
   
       expect(msg).to.equal('Done');
   
 });

 it('validateUserPassword Test#2', function() {
    let body ={
        newPassword: 'kokowa' ,
        confirmedPassword:'kokowa' 
    }
    let result = UserController.validateUserPassword(body)
     let msg;
     if(result.error!=  null){
            msg = 'Error happened in Test#2'
     }
     else{
            msg = 'Done'
     }
   
       expect(msg).to.equal('Error happened in Test#2');
 });

  it('validateUserPassword Test#3', function() {
    let body ={
        newPassword: 'kokowawaa1' ,
        confirmedPassword:'kokowawaa' 
    }
    let result = UserController.validateUserPassword(body)
    let msg;
     if(result.error!=  null){
            msg = 'Error happened in Test#3'
     }
     else{
            msg = 'Done'
     }
   
       expect(msg).to.equal('Error happened in Test#3');
 });

  
});


