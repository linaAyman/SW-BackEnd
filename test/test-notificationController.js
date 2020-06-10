var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const process=require('process')
dotenv.config();
//const AlbumController = require('../controllers/albumControllers');



it('Make Follow request', function(done) {
    const options = {
        method:'PUT',
        url: process.env.tempurl+'/follow/pSGLvTNsaW9BrKb4DWwVhpH8ecJTlo',
        headers: {
            'Authorization': process.env.arwaToken
        }
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.message).to.equal("OK");
       }
       done();
    });
});
it('Check Follow Notification', function(done) {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/user/notifications',
        headers: {
            'Authorization': process.env.artistToken
          },
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        var notificationArray = reqBody.notifications;
        var firstElement =notificationArray[0]
       expect(firstElement).to.equal("arwaHossam has followed you ");
       }
       done();
    });
});

it('Make Like Playlist action', function(done) {
    const options = {
        method:'PUT',
        url: process.env.tempurl+'/me/playlists',
        headers: {
            'Authorization': process.env.arwaToken

          },
          json:true,
          body: {
            'id':'5edfecc6481bf237e92a9fa7'
          }  
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        
       }
       done();
    });
});
it('Check Like Playlist Notification', function(done) {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/user/notifications',
        headers: {
            'Authorization': process.env.omniaToken
        },
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        var notificationArray = reqBody.notifications;
        var firstElement =notificationArray[0]
    //    console.log(notificationArray)
        expect(firstElement).to.equal("arwaHossam has liked your playlist: firstPlaylist");
       }
       done();
    });
});
/* Upload track test*/
/*
describe('create track', function () {
var supertest = require('supertest');
let  request = supertest('http://3.137.69.49:3000');
const AlbumController = require('../controllers/albumController');
it('try upload song action ', function (done) {
    request.post('/track/upload')
        .set('Authorization', process.env.artistToken)
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'let her go')
        .field('artist[]', 'Amr Diab')
        .field('genre', 'rock')
        .attach('music', 'Uploads/Passenger Let Her Go.mp3')
        .attach('image', 'Images/23.png')
        .end(function (err, res) {
            if (err) {
                console.log(err);
            } else {
                expect(res.status).to.equal(200);
            }
            done();
        });
});
});

it('Check Upload Song by followed artist Notification', function(done) {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/user/notifications',
        headers: {
            'Authorization': process.env.arwaToken
        },
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        var notificationArray = reqBody.notifications;
        var firstElement =notificationArray[0]
        console.log("Upload Song "+notificationArray)
    //    expect(firstElement).to.equal("arwaHossam has liked your playlist: firstPlaylist");
       }
       done();
    });
});
/*

/** Upload album test*/
/*
describe('add Album to check notification', function () {
    let supertest = require('supertest');
    let request = supertest('localhost:3000');
    it('valid ', function (done) {
    this.timeout(2000002344400);//you may need to increase time 
      request.post('/albums/addAlbum')
          .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRlODUyNzg1NTcxYzU0OTQxNTVhYWMiLCJuYW1lIjoiTGVvbmFyZG8iLCJpYXQiOjE1OTE2NDEzODMsImV4cCI6MTU5MjI0NjE4M30.OhkypboXLUGbE_sDE4reWJi4Tilp8LMtcHJpQkpXG5A  ')
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'let her go')
          .field('artist[]', 'Christina Perri')
          .field('genre[]', 'rap')
          .field('type','single')
          .attach('music',  'uploads/Guy Sebastian - Choir (Alan Walker Remix).mp3')
          .attach('image', 'images/23.png')
          .end(function (err, res) {
          if (err) {
              console.log(err);
          } else {
             // console.log(res);
            expect(res.status).to.equal(200);
          }
          done();
      });
  });
}); 

  it('Check Upload Album by followed artist Notification', function(done) {
    const options = {
        method:'GET',
        url: 'localhost:3000/user/notifications',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRlMDU5Yzk5YWIyMjExZThjNjdlYTAiLCJuYW1lIjoiYXJ3YWZvZmEiLCJpYXQiOjE1OTE2MDg3MzIsImV4cCI6MTU5MjIxMzUzMn0.lkiyIytFtNoTTQVdqDkrcufYOv8anW79_uYmLf2ih9U'
        },
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        var notificationArray = reqBody.notifications;
        var firstElement =notificationArray[0]
       // console.log("Upload Song "+notificationArray)
       let artistname = "Leonardo";
       let albumname = "let her go";
       console.log(firstElement+"helooooooooooooo")
        expect(firstElement).to.equal(artistname+" has uploaded new album: "+albumname);
       }
       done();
    });
});
*/
