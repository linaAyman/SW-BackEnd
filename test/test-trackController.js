/* var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const process=require('process')
dotenv.config();

it('Like Track Test#1', function(done) {
    const options = {
        method:'PUT',
        url: 'http://3.137.69.49:3000/me/tracks',
        headers: {
            'Authorization': process.env.token
          },
        json:true,
        body:{
            "id":"3JOF9NzQVkUXtCcJbEQuAb"
        }
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
       
        expect(body.body.message).to.equal("OK");
       }
       done();
    });
});
it('Like Track Test#2 Not providing body(trackId) to request', function(done) {
    const options = {
        method:'PUT',
        url: 'http://3.137.69.49:3000/me/tracks',
        headers: {
            'Authorization': process.env.token
          },
     
      };
      
    request(options, function(response, body) {
       if(body){
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.message).to.equal("trackId haven't been sent in the request");
    
        
       }
       done();
    });
});

it('GET Liked tracks to make sure previous like stored in database',  function(done) {
    
     const options = {
         method:'GET',
         url: 'http:///3.137.69.49:3000/me/tracks',
         headers: {
             'Authorization': process.env.token
        }
     }; 
        request(options, function(response, body) {
        if(body){
         var reqBody =body.body.toString('utf8');
         reqBody = JSON.parse(reqBody);
         expect(reqBody.tracksTemp.tracks[0].id).to.equal("3JOF9NzQVkUXtCcJbEQuAb")
         
        }
        done();
     });
 });

 it('remove track from Liked tracks', function(done) {
    
    const options = {
        method:'DELETE',
        url: 'http://3.137.69.49:3000/me/tracks',
        headers: {
            'Authorization': process.env.token
       },
       json:true,
       body:{
           "id":"3JOF9NzQVkUXtCcJbEQuAb"
       }

    };
     
      
     request(options, function(response, body) {
       if(body){
          
        expect(body.body.message).to.equal("Deleted Successfully");
        
       }
       done();
    });
});

it('GET like tracks library after removing track from it', function(done) {
    
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/me/tracks',
        headers: {
            'Authorization': process.env.token
       }

    };
     
      
    request(options, function(response, body) {
        if(body){
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            
            
            (reqBody.tracksTemp).should.have.property('tracks').with.lengthOf(0);
           }
    done();
    });
});

it('GET tracks by the specified genre Test#2 if provided request is wrong or not in the database',  function(done) {
    
    const options = {
        method:'GET',
        url: 'http:///3.137.69.49:3000/tracks/genre',
        headers: {
            'Authorization': process.env.token
       }
    }; 
       request(options, function(response, body) {
       if(body){
        var reqBody = body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.genre[0]).to.equal("rock");
        expect(reqBody.genre[1]).to.equal("jazz");
       }
       done();
    });
});


it('GET tracks by the specified genre',  function(done) {
    
    const options = {
        method:'GET',
        url: 'http:///3.137.69.49:3000/tracks/genre',
        headers: {
            'Authorization': process.env.token
       }
    }; 
       request(options, function(response, body) {
       if(body){
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(body.body.message).to.equal("There's no such tracks for that genre");
       }
       done();
    });
}); */