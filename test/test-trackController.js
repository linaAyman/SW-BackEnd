/* var request = require('request');
const dotenv = require('dotenv');
var request = supertest('3.137.69.49:3000');

describe('create track', function () {
    it('valid ', function (done) {
       this.timeout(100000);//note it may take more so if it doesnot work increase the time
        request.post('/track/upload')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
            .set('Content-Type', 'multipart/form-data')
            .field('name', 'let her go')
            .field('artist[]', 'Christina Perri')
            .field('genre', 'rock')
            .attach('music', 'uploads/tones.mp3')
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

describe('create track', function () {
    it('not valid  ', function (done) {
        this.timeout(120000000);//note it may take more so if it doesnot work increase the time
        request.post('/track/upload')
            .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
            .set('Content-Type', 'multipart/form-data')
            .field('name', 'let her go')
            .field('artist[]', 'Christina Perri')
            .field('genre', 'rock')
            .attach('music','Images/FB_IMG_1560785471157.jpg')
            .attach('image', 'Uploads/Passenger Let Her Go.mp3')
            .end(function (err, res) {
            if (err) {
                console.log(err);
            } else {
              expect(res.status).to.equal(400);
            }
            done();
        });
    });
}); 


describe('edit track', function () {
    it('valid ', function (done) {
        this.timeout(100000);//note it may take more so if it doesnot work increase the time
        request.post('/track/edit/5ee0a52112fb5846352459e7')
            .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
            .set('Content-Type', 'multipart/form-data')
            .field('name', 'let her go')
            .field('artist[]', 'Christina Perri')
            .field('genre', 'rap')
            .attach('music', "uploads/Amr Diab sa3ban 3lia ya 3'aly.mp3")
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
  
  describe('get track', function () {
    it('valid ', function (done) {
        this.timeout(100000);//note it may take more so if it doesnot work increase the time
        request.get('/track/5ee0a52112fb5846352459e7')
            .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
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




it('Like Track Test#1', function (done) {
    const options = {
        method: 'PUT',
        url: process.env.tempurl+'/me/tracks',
        headers: {
            'Authorization': process.env.userToken
        },
        json: true,
        body: {
            "id": "3JOF9NzQVkUXtCcJbEQuAb"
        }
    };

    request2(options, function (response, body) {

        if (body) {

            expect(body.body.message).to.equal("OK");
        }
        done();
    });
});
it('Like Track Test#2 Not providing body(trackId) to request', function (done) {
    const options = {
        method: 'PUT',
        url: +process.env.tempurl+'/me/tracks',
        headers: {
            'Authorization': process.env.userToken
        },

    };

    request2(options, function (response, body) {
        if (body) {
            var reqBody = body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            expect(reqBody.message).to.equal("trackId haven't been sent in the request");


        }
        done();
    });
});

it('GET Liked tracks to make sure previous like stored in database', function (done) {

    const options = {
        method: 'GET',
        url:  process.env.tempurl+'/me/tracks',
        headers: {
            'Authorization': process.env.userToken
        }
    };
    request2(options, function (response, body) {
        if (body) {
            var reqBody = body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            expect(reqBody.tracksTemp.tracks[0].id).to.equal("3JOF9NzQVkUXtCcJbEQuAb")

        }
        done();
    });
});

it('remove track from Liked tracks', function (done) {

    const options = {
        method: 'DELETE',
        url: process.env.tempurl+'/me/tracks',
        headers: {
            'Authorization': process.env.userToken
        },
        json: true,
        body: {
            "id": "3JOF9NzQVkUXtCcJbEQuAb"
        }

    };


    request2(options, function (response, body) {
        if (body) {

            expect(body.body.message).to.equal("Deleted Successfully");

        }
        done();
    });
});


it('GET tracks by the specified genre Test#2 if provided request is wrong or not in the database', function (done) {

    const options = {
        method: 'GET',
        url: process.env.tempurl+'/tracks/genre',
        headers: {
            'Authorization': process.env.token
        }
    };
    request2(options, function (response, body) {
        if (body) {
            var reqBody = body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            expect(reqBody.genre[0]).to.equal("rock");
            expect(reqBody.genre[1]).to.equal("jazz");
        }
        done();
    });
});


it('GET tracks by the specified genre', function (done) {

    const options = {
        method: 'GET',
        url: process.env.tempurl+'/tracks/genre',
        headers: {
            'Authorization': process.env.token
        }
    };
    request2(options, function (response, body) {
        if (body) {
            var reqBody = body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            expect(body.body.message).to.equal("There's no such tracks for that genre");
        }
        done();
    });
});
 */