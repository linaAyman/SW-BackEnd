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
    
<<<<<<< HEAD
//      expect(body.length).to.equal(2);
//     }
//     done();
//   });
// });


it('Get an artist topTracks', function(done) {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/artists/7H55rcKCfwqkyDFH9wpKM6/top-tracks'        
      };

    request(options, function(response, body) {
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);

        //console.log(reqBody[0])
        expect(reqBody[0].popularity).to.equal(88);
=======
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
>>>>>>> af3c66bece6601a85ece29c3b0449bee9a56c3eb
        done();
    }
       
    });
});
<<<<<<< HEAD

it('Get an artist with no Tracks', function(done) {
  const options = {
      method:'GET',
      url:process.env.tempurl+'/artists/0OdUWJ0sBjDrqHygGUXeCF/top-tracks'
    };

  request(options, function(response, body) {
     if(body)
     {
      var reqBody =body.body.toString('utf8');
      reqBody = JSON.parse(reqBody);

      expect(reqBody.message).to.equal("No tracks for such artist");
      done();
  }
     
  });
});

it('Get an artist about', function(done) {
  const options = {
      method:'GET',
      url:process.env.tempurl+'/artists/7H55rcKCfwqkyDFH9wpKM6/about'        
    };

  request(options, function(response, body) {
     if(body)
     {
      var reqBody =body.body.toString('utf8');
      reqBody = JSON.parse(reqBody);

      expect(reqBody[0].about).to.equal("christina perri has 48 years and she's very talanted");
      done();
  }
     
  });
});
=======
  */
>>>>>>> af3c66bece6601a85ece29c3b0449bee9a56c3eb
