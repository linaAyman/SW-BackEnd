/* var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const  UserController = require('../controllers/userControllers')

describe("joiValidation",function(){
it('joiValidation Test#1', function() {
    let body ={
            email: 'basanthassan019@gmail.com' ,
            password:'basanthassan' ,
            name:'basant Hassan',
            birthDate:'1999-03-21T00:07:55.485+00:00',
             gender:'true'
    }
    let result = UserController.validateSignUp(body)
     expect(result).to.validate;

   
 });

 it('joiValidation Test#2', function() {
    let body ={
            email: 'basanthassan019gmail.com' ,
            password:'basanthassan' ,
            name:'basant Hassan',
            birthDate:'1999-03-21T00:07:55.485+00:00',
             gender:'true'
    }
    let result = UserController.validateSignUp(body)
     expect(result).to.have.an.error;
 });

  it('joiValidation Test#3', function() {
    let body ={
            email: 'basanthassan019@gmail.com' ,
            password:'ba' ,
            name:'basant Hassan',
            birthDate:'1999-03-21T00:07:55.485+00:00',
             gender:'true'
    }
    let result = UserController.validateSignUp(body)
     expect(result).to.have.an.error;
 });

  it('joiValidation Test#4', function() {
    let body ={
            email: 'basanthassan019@gmail.com' ,
            password:'basanthassan' ,
            name:'b',
            birthDate:'1999-03-21T00:07:55.485+00:00',
             gender:'true'
    }
    let result = UserController.validateSignUp(body)
     expect(result).to.have.an.error;
 });

});


  */