 var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();


/*it('Get Playlist Tarcks Test#1', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/playlist/4qrimFUz8KFC8W6WrDiDne/tracks',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
       // console.log(reqBody)
        expect(reqBody.tracks[1].name).to.equal("tonight you belong to me (feat. Paul & Carmella Costabile)");
        expect(reqBody.tracks[0].name).to.equal("Ma'darsh Al Nesyan");
        expect(reqBody.tracks[2].name).to.equal("dream a little dream of me");
        expect(reqBody.tracks[3].name).to.equal("you've got a friend in me");
        }
    });
});
it('Get Playlist Test#2', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/playlist/4qrimFUz8KFC8W6WrDiDmc',
      };
    request(options, function(error, response, body) {
       if(body)
       {
           
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody[0].name).to.equal("Happy days");
        }
    });
});*/
it('Add Track to playlist', function(done) {
  const options = {
      method:'POST',
      url:process.env.tempurl+'/playlists/5edfecc6481bf237e92a9fa7/tracks',
      headers: {
          'Authorization': process.env.omniaToken
        },
        body: {
          "ids":	["6FRLCMO5TUHTexlWo8ym1W"]
        },
        json:true
      
    };
  request(options, function(error, response, body) {
     if(body)
     {
     
      expect(body).to.equal("Created");
      done();
  }
     
  });
});

it('Remove Track to playlist', function(done) {
  const options = {
      method:'DELETE',
      url:process.env.tempurl+'/playlists/5edfecc6481bf237e92a9fa7/tracks',
      headers: {
          'Authorization': process.env.omniaToken
        },
        body: {
          "ids":	["6FRLCMO5TUHTexlWo8ym1W"]
        },
        json:true
      
    };
  request(options, function(error, response, body) {
     if(body)
     {
     
      expect(body).to.equal("OK");
      done();
  }
     
  });
});
