var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const  UserController = require('../controllers/userControllers')

it('Get Current user information test', function(done) {
    const options = {
        method:'GET',
        url:'http://3.137.69.49:3000/user',
        headers: {
            'Authorization': process.env.token4
          }
        
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody[0].email).to.equal("arwahossam13@gmail.com");
        done();
    }
       
    });
});

it('Get Another user information test', function(done) {
    const options = {
        method:'GET',
        url:'http://3.137.69.49:3000/users/5e90f7cca4fd1123baaebf5f',
        headers: {
            'Authorization': process.env.token4
          }
        
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody[0].email).to.equal("olftabdelhamed@gmail.com");
        done();
    }
       
    });
});

it('Get Editable information test', function(done) {
    const options = {
        method:'GET',
        url:'http://3.137.69.49:3000/user/profile',
        headers: {
            'Authorization': process.env.token4
          }
        
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody[0].email).to.equal("arwahossam13@gmail.com");
        done();
    }
       
    });
});

describe("Edit Validation",function(){
    it('Edit Validation with Email', function() {
        let body ={
                email: 'arwahossam14@gmail.com' ,
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
                email: 'arwahossam14@gmail.com' ,
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
            'Authorization': process.env.token4
          },
        json:true,
        body: {
            'email': 'arwahossam13@gmail.com' ,
          //  'password':'arwaloli' ,
            'gender':'true' ,
            'birthDate':'1978-04-21T00:07:55.485+00:00',
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

