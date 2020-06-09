/* var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
var should = require('chai').should();
dotenv.config();


it('Search Feature Test#1', function() {
    const options = {
        method:'GET',
        url:'http://3.137.69.49:3000/search?query=dream+your+heart+makes',
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
        url:'http://3.137.69.49:3000/search?query=til+there+was+you',
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
        url:'http://3.137.69.49:3000/search?query=christina',
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



 */