// var expect  = require('chai').expect;
// var request = require('request');
// const dotenv = require('dotenv');
// const config = require('config');
// dotenv.config();
// const  UserController = require('../controllers/userControllers')

// describe("joiValidation",function(){
// it('joiValidation Test#1', function() {
//     let body ={
//             email: 'basanthassan019@gmail.com' ,
//             password:'basanthassan' ,
//             name:'basant Hassan',
//             birthDate:'1999-03-21T00:07:55.485+00:00',
//              gender:'true'
//     }
//     let result = UserController.validateSignUp(body)
//     let msg;
//     if(result.error!=  null){
//            msg = 'Error happened in Test#1'
//     }
//     else{
//            msg = 'Done'
//     }
  
//       expect(msg).to.equal('Done');

   
//  });

//  it('joiValidation Test#2', function() {
//     let body ={
//             email: 'basanthassan019gmail.com' ,
//             password:'basanthassan' ,
//             name:'basant Hassan',
//             birthDate:'1999-03-21T00:07:55.485+00:00',
//              gender:'true'
//     }
//     let result = UserController.validateSignUp(body)
//     let msg;
//      if(result.error!=  null){
//             msg = 'Error happened in Test#2'
//      }
//      else{
//             msg = 'Done'
//      }
   
//        expect(msg).to.equal('Error happened in Test#2');
//  });

//   it('joiValidation Test#3', function() {
//     let body ={
//             email: 'basanthassan019@gmail.com' ,
//             password:'ba' ,
//             name:'basant Hassan',
//             birthDate:'1999-03-21T00:07:55.485+00:00',
//              gender:'true'
//     }
//     let result = UserController.validateSignUp(body)
//     let msg;
//     if(result.error!=  null){
//            msg = 'Error happened in Test#3'
//     }
//     else{
//            msg = 'Done'
//     }
  
//       expect(msg).to.equal('Error happened in Test#3');
//  });

//   it('joiValidation Test#4', function() {
//     let body ={
//             email: 'basanthassan019@gmail.com' ,
//             password:'basanthassan' ,
//             name:'b',
//             birthDate:'1999-03-21T00:07:55.485+00:00',
//              gender:'true'
//     }
//     let result = UserController.validateSignUp(body)
//     let msg;
//     if(result.error!=  null){
//            msg = 'Error happened in Test#4'
//     }
//     else{
//            msg = 'Done'
//     }
  
//       expect(msg).to.equal('Error happened in Test#4');
//  });

// });


 