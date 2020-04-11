var expect  = require('chai').expect;
var should = require('chai').should();
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const  UserController = require('../controllers/userControllers')
dotenv.config();


it('Get Current user information test', function(done) {
  const options = {
      method:'GET',
      url:'http://3.137.69.49:3000/user',
      headers: {
          'Authorization': process.env.token1
        }
      
    };
  request(options, function(error, response, body) {
     if(body)
     {
      var reqBody =body.toString('utf8');
      reqBody = JSON.parse(reqBody);
      expect(reqBody[0].email).to.equal("omniahossa1m4@gmail.com");
      done();
  }
     
  });
});

it('Get Another user information test', function(done) {
  const options = {
      method:'GET',
      url:'http://3.137.69.49:3000/users/5e85b116e1d0f825dc0c5f01',
      headers: {
          'Authorization': process.env.token1
        }
      
    };
  request(options, function(error, response, body) {
     if(body)
     {
      var reqBody =body.toString('utf8');
      reqBody = JSON.parse(reqBody);
      expect(reqBody[0].name).to.equal("mosho");
      done();
  }
     
  });
});

it('Get Editable information test', function(done) {
  const options = {
      method:'GET',
      url:'http://3.137.69.49:3000/user/profile',
      headers: {
          'Authorization': process.env.token1
        }
      
    };
  request(options, function(error, response, body) {
     if(body)
     {
      var reqBody =body.toString('utf8');
      reqBody = JSON.parse(reqBody);
      expect(reqBody[0].email).to.equal("omniahossa1m4@gmail.com");
      done();
  }
     
  });
});

describe("Edit Validation",function(){
  it('Edit Validation with Email', function() {
      let body ={
              email: 'arwahossam13@gmail.com' ,
              password:'arwasaif' ,
              gender:'true' ,
              birthDate:'1999-03-21T00:07:55.485+00:00',
              country : 'egypt',
              phone:'01112345678'
          }
      let result = UserController.validateFullEdit(body)
      expect(result.error).to.equals(null);
  
     
   });

   it('Edit Validation without Email', function() {
      let body ={
              email: 'arwahossam13@gmail.com' ,
              gender:'true' ,
              birthDate:'1999-03-21T00:07:55.485+00:00',
              country : 'egypt',
              phone:'01112345678'
          }
      let result = UserController.validateEditWithoutMail(body)
      expect(result.error).to.equals(null);
  
     
   });
});
it('Edit Current user information test', function(done) {
  const options = {
      method:'POST',
      url:'http://3.137.69.49:3000/user/editprofile',
      headers: {
          'Authorization': process.env.token2
        },
      json:true,
      body: {
          'email': 'arwahossam14@gmail.com' ,
        //  'password':'arwaloli' ,
          'gender':'true' ,
          'birthDate':'1999-04-21T00:07:55.485+00:00',
          'country' : 'egypt',
          'phone':'01112345678'
      }  
      
    };
  request(options, function(error, response, body) {
     if(body)
     {
      expect(body.message).to.equal("Auth successful without email");
      done();
  }
     
  });
});


/*it('signup Test#1', function(done) {
    const options = {
        method:'POST',
        url:'http://localhost:3000/user/signup',
        json:true,
        body:{
            'email': 'nancy.hassan1998@gmail.com' ,
            'password':'nancyhassan' ,
            'name':'nancy Hassan',
            'birthDate':'1999-03-21T00:07:55.485+00:00',
            'gender':'true'
          }

      };
    request(options, function( response, body) {
       if(body)
       {
         console.log("KKKKKKKKKKKKKKKKKKKKKKHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
         console.log(body)
         expect(body.body.message).to.equal("Username already exist");
       // should.exist(body.body.token)
       
        }
        done();
    });
});*/
/*describe("joiValidation",function(){
  it('joiValidation Test#1', function() {
      let body ={
              email: 'basanthassan019@gmail.com' ,
              password:'basanthassan' ,
              name:'basant Hassan',
              birthDate:'1999-03-21T00:07:55.485+00:00',
               gender:'true'
      }
      let result = userController.joiValidate(body)
       expect(result).to.validate;
  
     
   });
  
  });*/