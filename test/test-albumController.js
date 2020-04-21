var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();

it('Get Album Test#1', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/albums/75iQSBSaztFIAun9qLLCnb',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody[0].name).to.equal("Girls Like You (feat. Cardi B)");
        }
    });
});

it('Get tracks in album test', function(done) {
    const options = {
        method:'GET',
        url:'http://3.137.69.49:3000/albums/75iQSBSaztFIAun9qLLCnb/tracks'
        
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        //console.log(reqBody.tracks.length)
        expect(reqBody.tracks.length).to.greaterThan(0);
       /* expect(reqBody.tracks[1].id).to.equal("7fmVIBMLYiXRtTFOlxv90i");
        expect(reqBody.tracks[2].id).to.equal("0tShdTlRbZas6OFwEkX56U");
        expect(reqBody.tracks[3].id).to.equal("4aVmfly4CkmibiRLn5AHc2");*/
        done();
    }
       
    });
});