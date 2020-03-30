var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();


it('Search Feature Test#1', function(done) {
    const options = {
        method:'GET',
        url:'http://localhost:3000/search?query=dream+your+heart+makes',
        headers: {
          'Authorization': process.env.token
        }
      };
    request(options, function(error, response, body) {
        var reqBody =body.toString();
        reqBody = JSON.parse(reqBody);
        console.log(reqBody)
        expect(reqBody.trackResult[0].name).to.equal('a dream is a wish your heart makes');
        done();
    });
});

it('Search Feature Test#2', function(done) {
    const options = {
        method:'GET',
        url:'http://localhost:3000/search?query=til+there+was+you',
        headers: {
          'Authorization': process.env.token
        }
      };
    request(options, function(error, response, body) {
        var reqBody =body.toString();
        reqBody = JSON.parse(reqBody);
        console.log(reqBody)
        expect(reqBody.trackResult[0].name).to.equal('til there was you');
        expect(reqBody.trackResult[1].name).to.equal('til there was you (sing-a-long)');
        done();
    });
});

it('Search Feature Test#3 / Artist Search test', function(done) {
    const options = {
        method:'GET',
        url:'http://localhost:3000/search?query=christina',
        headers: {
          'Authorization': process.env.token
        }
      };
    request(options, function(error, response, body) {
        var reqBody =body.toString();
        reqBody = JSON.parse(reqBody);
        console.log(reqBody)
        expect(reqBody.artistResult[0].name).to.equal('Christina Aug');
        expect(reqBody.artistResult[1].name).to.equal('Christina Perri');
        done();
    });
});

