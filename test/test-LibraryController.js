var expect = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const process = require('process')
dotenv.config();


it('Like Playlist#1', function(done) {
    const options = {
        method:'PUT',
        url:process.env.tempurl+'/me/playlists',
        headers: {
          'Authorization': process.env.userToken
        },
        json:true,
        body: {
            "id": "4qrimFUz8KFC8W6WrDiDmf"
        }
      };
    request(options, function(error, response, body) {
        if(body)
        {
        expect(body.message).to.equal("OK");
        }
        
        done();
    });
  });

  
it('Get Playlists in Library of current logged in user #2', function(done) {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/me/playlists',
        headers: {
          'Authorization': process.env.userToken
        }
      };
    request(options, function(error, response, body) {
        if(body){
            var reqBody =body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            let index=reqBody.totalPlaylists
            reqBody.playlists[index-1].id.should.equal('4qrimFUz8KFC8W6WrDiDmf')
           }
           done();
        });
  });
 

  it('remove Playlist from Library of current logged in user #3', function(done) {
    const options = {
        method:'DELETE',
        url:process.env.tempurl+'/me/playlists',
        headers: {
          'Authorization': process.env.userToken
        },
        json:true,
        body: {
            "id": "4qrimFUz8KFC8W6WrDiDmf"
        }
      };
    request(options, function(error, response, body) {
        if(body)
        {
        expect(body.message).to.equal("Deleted Successfully");
        }
        
        done();
        });
  });

  let playId;
  it('create Playlist for a user #4', function(done) {
    const options = {
        method:'PUT',
        url:process.env.tempurl+'/user/createPlaylist?name=MyPlaylist',
        headers: {
          'Authorization': process.env.userToken
        }
      };
    request(options, function(error, response, body) {
        if(body){
            var reqBody =body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            expect(reqBody.message).to.equal("OK")
            playId=reqBody.playlistid;
           }
           done();
        });
  });


  it('get Playlists and make sure it contained created playlist #5', function(done) {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/me/playlists',
        headers: {
          'Authorization': process.env.userToken
        }
      };
    request(options, function(error, response, body) {

        if(body){
            var reqBody =body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            let index=reqBody.totalPlaylists
            reqBody.playlists[index-1].id.should.equal(playId)
           }
           done();
        });
  });


  it('Like Ablum#4', function(done) {
    const options = {
        method:'PUT',
        url:process.env.tempurl+'/me/albums',
        headers: {
          'Authorization': process.env.userToken
        },
        json:true,
        body: {
            "id": "75iQSBSaztFIAun9qLLCnb"
        }
      };
    request(options, function(error, response, body) {
        if(body)
        {
        expect(body.message).to.equal("OK");
        }
        
        done();
    });
  });

  
it('Get albums in Library of current logged in user #5', function(done) {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/me/albums',
        headers: {
          'Authorization': process.env.userToken
        }
      };
    request(options, function(error, response, body) {
        if(body){
            var reqBody =body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            let index=reqBody.totalAlbums
            reqBody.albums[index-1].id.should.equal('75iQSBSaztFIAun9qLLCnb')
           }
           done();
        });
  });
 

  it('remove album from Library of current logged in user #6', function(done) {
    const options = {
        method:'DELETE',
        url:process.env.tempurl+'/me/albums',
        headers: {
          'Authorization': process.env.userToken
        },
        json:true,
        body: {
            "id": "75iQSBSaztFIAun9qLLCnb"
        }
      };
    request(options, function(error, response, body) {
        if(body)
        {
        expect(body.message).to.equal("Deleted Successfully");
        }
        
        done();
        });
  });
