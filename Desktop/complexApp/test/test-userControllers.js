var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const  UserController = require('../controllers/userControllers')

describe("sign up",function(){
  it('signup Test#1', function(done) {
   //this.timeout(10000);
    const options = {
        method:'POST',
        url:'http://3.137.69.49:3000/user/signup',
        json:true,
        body:{
            'email': 't2323@qooo.eg' ,
            'password':'brawhaaa' ,
            'name':'taya',
            'birthDate':'1999-03-21T00:07:55.485+00:00',
            'gender':'true'
          }

      };
    request(options, function( response, body) {
       if(body)
       {
         console.log(body.body);
        expect(body.body.message).to.have.errmsgs;
        done();
        }
    
    });
   });


  it('signup Test#2', function(done) {
    this.timeout(10000);
    const options = {
        method:'POST',
        url:'http://3.137.69.49:3000/user/signup',
        json:true,
        body:{
            'email': 'basanthassan019@gmail.com' ,
            'password':'basanthassan' ,
            'name':'basantHassan',
            'birthDate':'1999-03-21T00:07:55.485+00:00',
            'gender':'true'
          }

      };
    request(options, function( response, body) {
       if(body)
       {
        expect(body.body.message).to.equal("User created");
        expect(body.body.token);
        done();
        }
    });
 });
});

describe("login ",function(){
  it('login Test#1', function(done) {
    const options = {
        method:'POST',
        url:'http://3.137.69.49:3000/user/login',
        json:true,
        body:{
            'email': 'arwahossam13@gmail.com' ,
            'password':'arwasaif' 
          }

      };
    request(options, function( response, body) {
       if(body)
       {
        expect(body.body.message).to.equal("Auth successful");
        expect(body.body.token);
        done();
        }
    });
   });


  it('login Test#2', function(done) {
    const options = {
        method:'POST',
        url:'http://3.137.69.49:3000/user/login',
        json:true,
        body:{
          'email': 'arwahossam13@gmail.com' ,
          'password':'saifarwa'  
          }

      };
    request(options, function( response, body) {
       if(body)
       {
        expect(body.body.message).to.have.errmsgs;
        done();
        }
    });
 });
});

describe("logout ",function(){
    it('logout Test#1', function(done) {
      const options = {
          method:'POST',
          url:'http://3.137.69.49:3000/user/logout',
          headers: {
            'Authorization': process.env.token2
          }
  
        };
      request(options, function( response, body) {
         if(body)
         {
           var reqBody =body.body.toString('utf8');
           reqBody = JSON.parse(reqBody)
          expect(reqBody.message).to.have.errmsgs;
          done();
         
          }
      });
     });

     it('logout Test#2', function(done) {
        const options = {
            method:'POST',
            url:'http://3.137.69.49:3000/user/logout',
            headers: {
              'Authorization': process.env.token4
            }
    
          };
        request(options, function( response, body) {
           if(body)
           {
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody)
            expect(reqBody.message).to.equal("logging out success");
            done();
           
            }
        });
       });
});
 
describe("mail exists ",function(){
    it('mail exists Test#1', function(done) {
      const options = {
          method:'GET',
          url:'http://3.137.69.49:3000/user/mailExist/basanthassan019@gmail.com'
  
        };
      request(options, function( response, body) {
         if(body)
         {
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody)
             expect(reqBody.message).to.have.errmsgs;
             done();
         
          }
      });
     });
     it('mail exists Test#2', function(done) {
        const options = {
            method:'GET',
            url:'http://3.137.69.49:3000/user/mailExist/hassan.taya@hotmail.com'
            
          };
        request(options, function( response, body) {
           if(body)
           {
              var reqBody =body.body.toString('utf8');
              reqBody = JSON.parse(reqBody)
              expect(reqBody.message).to.equal("success");
              done();
           
            }
        });
       });
});

  
describe("verify mail",function(){
    it('verify mail Test#1', function(done) {
      const options = {
          method:'GET',
          url:'http://3.137.69.49:3000/verify?id=UJq5c5TwhUdPmTaq6LDVs86V3ikw39LSqhHCe1lpBfCifLx6cZ'
          
        };
      request(options, function( response, body) {
         if(body)
         {
           
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
             expect(reqBody.message).to.equal("Email is been Successfully verified");
             done();
         
          }
      });
     });
    
});
  

 describe("changePassword",function(){
    it('changePassword Test#1', function(done) {
      const options = {
          method:'POST',
          url:'http://3.137.69.49:3000/user/changePassword',
          body:{
            'oldPassword':"arwasaif",
            'newPassword': 'kokowawaa' ,
            'confirmedPassword':'kokowawaa' 
          },
          json:true,
          headers: {
            'Authorization': process.env.token4
          }
          
        };
      request(options, function( response, body) {
         if(body)
         {
             expect(body.body.message).to.equal("You change password successfly");
             done();
         
          }
      });
     });
    
});

describe("forgetPassword",function(){
    it('forgetPassword  Test#1', function(done) {
      const options = {
          method:'GET',
          url:'http://3.137.69.49:3000/user/forgetPassword/arwahossam13@gmail.com'
        };
      request(options, function( response, body) {
         if(body)
         {
             var reqBody =body.body.toString('utf8');
             reqBody = JSON.parse(reqBody);
            expect(reqBody.message).to.equal("send msg successfuly");
            done();
         
          }
      });
     });
    
});

describe("isPremuim",function(){
    it('isPremuim  Test#1', function(done) {
      const options = {
          method:'GET',
          url:'http://3.137.69.49:3000/user/isPremuim',
          json:true,
          headers: {
            'Authorization': process.env.token4
          }
        };
      request(options, function( response, body) {
         if(body)
         {
         
            expect(body.body.message).to.equal("User is now Premuim");
            done();
         
          }
      });
     });
    
});


describe("resetPassword",function(){
    it('resetPassword Test#1', function(done) {
      const options = {
          method:'POST',
          url:'http://3.137.69.49:3000/user/resetPassword?id=D1RU6p3rShCPhE91uRn48ksX2rkOhZAPTSZDGNpTfH10ar5cLt',
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
           done();
         
          }
      });
     });
});

describe("delete User",function(){
  it('delete User Test#1', function(done) {
    const options = {
        method:'DELETE',
        url:'http://3.137.69.49:3000/5e8dac4b10899548ecede070',
        json:true,
        headers: {
          'Authorization': process.env.token4
        }


      };
    request(options, function( response, body) {
       if(body)
       {
          var reqBody =body.body.toString('utf8');
          reqBody = JSON.parse(reqBody)
           expect(reqBody.message).to.equal("User deleted");
           done();
       
        }
    });
   });
  
});


