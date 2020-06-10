/* var expect  = require('chai').expect;
var should = require('chai').should();
var assert=require('chai').assert;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const homeController=require('../controllers/homeController')
const playerController=require('../controllers/playerController')
dotenv.config();



// const tempurl='http://localhost:3000'+'/home';

it('Save Recently Played Item Track#1 ', function(done) {
    const options = {
        method:'POST',
        url: process.env.tempurl+'/player/save-played-track/6FRLCMO5TUHTexlWo8ym1W?type=Track',
        headers: {
                'Authorization': process.env.userToken
        },
        json:true,
      };
    request(options, function(error, response, body) {
       
        if(body)
        {
        console.log(body)
        expect(body.message).to.equal("OK");
        }
        
        done();
        });
});
it('Save Recently Played Item Playlist#2', function(done) {
    const options = {
        method:'POST',
        url: process.env.tempurl+'/player/save-played-track/4qrimFUz8KFC8W6WrDiDnd?type=Playlist',
        headers: {
                'Authorization': process.env.userToken
        },
        json:true,
      };
    request(options, function(error, response, body) {
       
        if(body)
        {
        console.log(body)
        expect(body.message).to.equal("OK");
        }
        done();

    });
});
it('Save Recently Played Item Playlist#3', function(done) {
    const options = {
        method:'POST',
        url: process.env.tempurl+'/player/save-played-track/4qrimQUz8KFC8W6WrDiDnc?type=Playlist',
        headers: {
                'Authorization': process.env.userToken
        },
        json:true,
      };
    request(options, function(error, response, body) {
       
        if(body)
        {
        console.log(body)
        expect(body.message).to.equal("OK");
        }
        done();

    });
});
it('Save Recently Played Item Artist#4', function(done) {
    const options = {
        method:'POST',
        url: process.env.tempurl+'/player/save-played-track/0OdUWJ0sBjDrqHygGUXeCF?type=Artist',
        headers: {
                'Authorization': process.env.userToken
        },
        json:true,
      };
    request(options, function(error, response, body) {
       
        if(body)
        {
        expect(body.message).to.equal("OK");
        }
        done();

    });
});


it('GET recently played items Pagination #5',  function() {
    
    const options = {
        method:'GET',
        url: process.env.tempurl+'/home/recently-played?offset=1&limit=2',
        headers: {
            'Authorization': process.env.userToken
       }
    }; 
       request(options, function(response, body) {
       if(body){
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        reqBody[1].id.should.equal('4qrimFUz8KFC8W6WrDiDnd');
        reqBody[0].id.should.equal('4qrimQUz8KFC8W6WrDiDnc');
       }
    });
});

it('GET recently played items #6',  function() {
    
         const options = {
             method:'GET',
             url: process.env.tempurl+'/home/recently-played',
             headers: {
                 'Authorization': process.env.userToken
            }
         }; 
            request(options, function(response, body) {
            if(body){
             var reqBody =body.body.toString('utf8');
             reqBody = JSON.parse(reqBody);
             reqBody[1].id.should.equal('4qrimQUz8KFC8W6WrDiDnc');
             reqBody[0].id.should.equal('0OdUWJ0sBjDrqHygGUXeCF');
        
            }
         });
     });  */