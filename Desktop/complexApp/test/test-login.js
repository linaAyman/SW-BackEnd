/*var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const  UserController = require('../controllers/userControllers')


describe("login ",function(){
  it('login Test#1', function() {
    const options = {
        method:'POST',
        url:'http://localhost:3000/user/login',
        json:true,
        body:{
            'email': 'basanthassan019@gmail.com' ,
            'password':'basanthassan' 
          }

      };
    request(options, function( response, body) {
       if(body)
       {
        expect(body.body.message).to.equal("Auth successful");
        expect(body.body.token);
       
        }
    });
   });


  it('login Test#2', function() {
    const options = {
        method:'POST',
        url:'http://localhost:3000/user/login',
        json:true,
        body:{
            'email': 'basanthassan019@gmail.com' ,
            'password':'hassanbasant' 
          }

      };
    request(options, function( response, body) {
       if(body)
       {
        expect(body.body.message).to.have.errmsgs;
       
        }
    });
 });
});



describe("logout ",function(){
    it('logout Test#1', function() {
      const options = {
          method:'POST',
          url:'http://localhost:3000/user/logout',
          headers: {
            'Authorization': process.env.token1
          }
  
        };
      request(options, function( response, body) {
         if(body)
         {
             expect(body.body.message).to.have.errmsgs;
          
         
          }
      });
     });

     it('logout Test#2', function() {
        const options = {
            method:'POST',
            url:'http://localhost:3000/user/logout',
            headers: {
              'Authorization': process.env.token2
            }
    
          };
        request(options, function( response, body) {
           if(body)
           {
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody)
            expect(reqBody.message).to.equal("logging out success");
            
           
            }
        });
       });
});
 

describe("mail exists ",function(){
    it('mail exists Test#1', function() {
      const options = {
          method:'GET',
          url:'http://localhost:3000/user/mailExist/basanthassan019@gmail.com'
  
        };
      request(options, function( response, body) {
         if(body)
         {
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody)
             expect(reqBody.message).to.have.errmsgs;
          
         
          }
      });
     });
     it('mail exists Test#2', function() {
        const options = {
            method:'GET',
            url:'http://localhost:3000/user/mailExist/hassan.taya@hotmail.com'
            
          };
        request(options, function( response, body) {
           if(body)
           {
              var reqBody =body.body.toString('utf8');
              reqBody = JSON.parse(reqBody)
              expect(reqBody.message).to.equal("success");
            
           
            }
        });
       });
});

describe("delete User",function(){
    it('delete User Test#1', function() {
      const options = {
          method:'DELETE',
          url:'http://localhost:3000/user/5e8dac4b10899548ecede070',
          json:true,
          headers: {
            'Authorization': process.env.token2
          }
  
  
        };
      request(options, function( response, body) {
         if(body)
         {
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody)
             expect(reqBody.message).to.equal("User deleted");
          
         
          }
      });
     });
    
});
  
*/
/*
describe("verify mail",function(){
    it('verify mail Test#1', function() {
      const options = {
          method:'GET',
          url:'http://localhost:3000/user/verify?id=UJq5c5TwhUdPmTaq6LDVs86V3ikw39LSqhHCe1lpBfCifLx6cZ'
          
        };
      request(options, function( response, body) {
         if(body)
         {
           
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
             expect(reqBody.message).to.equal("Email is been Successfully verified");
          
         
          }
      });
     });
    
});
  

 describe("changePassword",function(){
    it('changePassword Test#1', function() {
      const options = {
          method:'POST',
          url:'http://localhost:3000/user/changePassword',
          body:{
            'oldPassword':"basanthassan",
            'newPassword': 'kokowawaa' ,
            'confirmedPassword':'kokowawaa' 
          },
          json:true,
          headers: {
            'Authorization': process.env.token2
          }
          
        };
      request(options, function( response, body) {
         if(body)
         {
             expect(body.body.message).to.equal("You change password successfly");
          
         
          }
      });
     });
    
});

describe("forgetPassword",function(){
    it('forgetPassword  Test#1', function() {
      const options = {
          method:'GET',
          url:'http://localhost:3000/user/forgetPassword/basanthassan019@gmail.com'
        };
      request(options, function( response, body) {
         if(body)
         {
             var reqBody =body.body.toString('utf8');
             reqBody = JSON.parse(reqBody);
            expect(reqBody.message).to.equal("send msg successfuly");
          
         
          }
      });
     });
    
});



describe("isPremuim",function(){
    it('isPremuim  Test#1', function() {
      const options = {
          method:'GET',
          url:'http://localhost:3000/user/isPremuim',
          json:true,
          headers: {
            'Authorization': process.env.token2
          }
        };
      request(options, function( response, body) {
         if(body)
         {
         
            expect(body.body.message).to.equal("User is now Premuim");
          
         
          }
      });
     });
    
});








describe("resetPassword",function(){
    it('resetPassword Test#1', function() {
      const options = {
          method:'POST',
          url:'http://localhost:3000/user/resetPassword?id=D1RU6p3rShCPhE91uRn48ksX2rkOhZAPTSZDGNpTfH10ar5cLt',
          json: true,
          body:{
            'newPassword': 'yarabyarab' ,
            'confirmedPassword':'yarabyarab' 
          },
      
        };
        request(options, function( response, body) {
         if(body)
         {
           expect(body.body.message).to.equal("You reset password successfly");
          
         
          }
      });
     });
});
*/
