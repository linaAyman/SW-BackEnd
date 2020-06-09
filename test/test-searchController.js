var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
var should = require('chai').should();
dotenv.config();


it('Search Feature Test#1', function() {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/search?query=dream+your+heart+makes',
        headers: {
          'Authorization': process.env.token
        }
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        ///console.log(reqBody)
        reqBody = JSON.parse(reqBody);
        expect(reqBody.trackResult[0].name).to.equal('a dream is a wish your heart makes');
        }
    });
});

it('Search Feature Test#2', function() {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/search?query=til+there+was+you',
        headers: {
          'Authorization': process.env.token
        }
      };
    request(options, function(error, response, body) {
      if(body){
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.trackResult[0].name).to.equal('til there was you');
        expect(reqBody.trackResult[1].name).to.equal('til there was you (sing-a-long)');
        }
    });
});

it('Search Feature Test#3 / Artist Search test', function() {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/search?query=christina',
        headers: {
          'Authorization': process.env.token
        }
      };
    request(options, function(error, response, body) {
      if(body){
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.artistResult[0].name).to.equal('Christina Perri');
        expect(reqBody.artistResult[1].name).to.equal('Christina Rexha');
       }
    });
});


it('save Recent Search of type Track #4', function(done) {
  const options = {
      method:'POST',
      url:process.env.tempurl+'/search?id=3JOF9NzQVkUXtCcJbEQuAb&type=track',
      headers: {
        'Authorization': process.env.userToken
      }
    };
  request(options, function(error, response, body) {
    if(body){
      var reqBody =body.toString('utf8');
      reqBody = JSON.parse(reqBody);
      expect(body.message).to.equal("OK");
     }
     done();
  });
});

it('save Recent Search of type Playlist #5', function(done) {
  const options = {
      method:'POST',
      url:process.env.tempurl+'/search?id=4qrimFUz8KFC8W6WrDiDnh&type=playlist',
      headers: {
        'Authorization': process.env.userToken
      }
    };
  request(options, function(error, response, body) {
    if(body){
      var reqBody =body.toString('utf8');
      reqBody = JSON.parse(reqBody);
      expect(body.message).to.equal("OK");
     }
     done();
  });
});






