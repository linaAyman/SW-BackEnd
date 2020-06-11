var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();

it('Get Related Artists', function(done) {
  const options = {
      method:'GET',
      url:process.env.tempurl+'/artists/7H55rcKCfwqkyDFH9wpKM6/related-artists',
      headers: {
          'Authorization': process.env.omniaToken
        },
       
        json:true
      
    };
  request(options, function(error, response, body) {
    
    if(body)
    {
    
     expect(body.length).to.equal(2);
    }
    done();
  });
});
/*
it('Get an artist test', function(done) {
    const options = {
        method:'GET',
        url:'http://3.137.69.49:3000/artist/0OdUWJ0sBjDrqHygGUXeCF',
        headers: {
            'Authorization': process.env.token4
          }
        
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        //console.log(reqBody[0].type)
        expect(reqBody[0].type).to.equal("artist");
        done();
    }
       
    });
});
  */