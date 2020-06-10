var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const  UserController = require('../controllers/userControllers')

describe("validateChangePassword ",function(){
    it('validateChangePassword  Test#1', function() {
        let body ={
            oldPassword:"nancyhassan",
            newPassword: 'kokowawaa' ,
            confirmedPassword:'kokowawaa' 
               
        }
        let result = UserController.validateChangePassword  (body)
         expect(result).to.validate;
    
       
     });
    
     it('validateChangePassword  Test#2', function() {
        let body ={
            oldPassword:"nancyhassan",
            newPassword: 'kokowaaa' ,
            confirmedPassword:'kokowaaa' 
        }
        let result = UserController.validateChangePassword (body)
         expect(result).to.have.an.error;
     });
    
      it('validateChangePassword Test#3', function() {
        let body ={
            newPassword: 'kokowawaa1' ,
            confirmedPassword:'kokowawaa' 
        }
        let result = UserController.validateChangePassword (body)
         expect(result).to.have.an.error;
     });
    
      
 });
    
    
    