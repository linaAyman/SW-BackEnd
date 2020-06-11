/* var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
var supertest = require('supertest');
var request = supertest('localhost:3000');

describe('add Album', function () {
  it('valid ', function (done) {
    this.timeout(2000002344400);//you may need to increase time 
      request.post('/albums/addAlbum')
          .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'let her go')
          .field('artist[]', 'Christina Perri')
          .field('genre[]', 'rap')
          .field('type','single')
          .attach('music',  'uploads/Guy Sebastian - Choir (Alan Walker Remix).mp3')
          .attach('image', 'images/FB_IMG_1560785471157.jpg')
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

describe('edit Album', function () {
  it('valid ', function (done) {
    this.timeout(2000002344400);//you may need to increase time 
      request.post('/albums/editAlbum/TTZEEJ4pNmlVsWWi6w1d2R6JX9R1Wg')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'let her go')
          .field('artist[]', 'Christina Perri')
          .field('genre[]', 'rock')
          .field('type', 'compilation')
          .attach('music', "uploads/Amr Diab wa7yaty 7'liky.mp3")
          .attach('music', 'uploads/Amr Diab wa75teny.mp3')
          .attach('image', 'images/FB_IMG_1560785471157.jpg')
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(res.body)
                  expect(res.status).to.equal(200);
                  
              }
              done();
          });
  });
});

describe('add track to Album', function () {
  it('valid ', function (done) {
    this.timeout(2345500000);
      request.post('/albums/addTrack/5ee0b701a018fd6580f384c3')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
          .set('Content-Type', 'multipart/form-data')
          .field('name', 'let her go')
          .field('artist[]', 'Christina Perri')
          .field('genre', 'rock')
          .attach('music', "uploads/Polytopia(Quetzali Song).mp3")
          .attach('image', 'images/FB_IMG_1560785471157.jpg')
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(res.body)
                  expect(res.status).to.equal(200);
                  
              }
              done();
          });
  });
});

describe('delet track from Album', function () {
  it('valid ', function (done) {
    this.timeout(2345500000);
      request.delete('/albums/removeTrack/5ee0b701a018fd6580f384c2/5ee0b701a018fd6580f384c3')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
          .end(function (err, res) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(res.body)
                  expect(res.status).to.equal(200);
              }
              done();
          });
  });
});

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
    /* 
        done();
    }
       
    });
});
 */