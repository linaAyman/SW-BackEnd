var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();

// describe('create track', function () {
//     it('valid ', function (done) {
//        this.timeout(100000);//note it may take more so if it doesnot work increase the time
//         request.post('/track/upload')
//             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
//             .set('Content-Type', 'multipart/form-data')
//             .field('name', 'let her go')
//             .field('artist[]', 'Christina Perri')
//             .field('genre', 'rock')
//             .attach('music', 'uploads/tones.mp3')
//             .attach('image', 'images/FB_IMG_1560785471157.jpg')
//             .end(function (err, res) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     expect(res.status).to.equal(200);
//                 }
//                 done();
//             });
//     });
// });

// describe('create track', function () {
//     it('not valid  ', function (done) {
//         this.timeout(120000000);//note it may take more so if it doesnot work increase the time
//         request.post('/track/upload')
//             .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
//             .set('Content-Type', 'multipart/form-data')
//             .field('name', 'let her go')
//             .field('artist[]', 'Christina Perri')
//             .field('genre', 'rock')
//             .attach('music','Images/FB_IMG_1560785471157.jpg')
//             .attach('image', 'Uploads/Passenger Let Her Go.mp3')
//             .end(function (err, res) {
//             if (err) {
//                 console.log(err);
//             } else {
//               expect(res.status).to.equal(400);
//             }
//             done();
//         });
//     });
// }); 


// describe('edit track', function () {
//     it('valid ', function (done) {
//         this.timeout(100000);//note it may take more so if it doesnot work increase the time
//         request.post('/track/edit/5ee0a52112fb5846352459e7')
//             .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
//             .set('Content-Type', 'multipart/form-data')
//             .field('name', 'let her go')
//             .field('artist[]', 'Christina Perri')
//             .field('genre', 'rap')
//             .attach('music', "uploads/Amr Diab sa3ban 3lia ya 3'aly.mp3")
//             .attach('image', 'images/FB_IMG_1560785471157.jpg')
//             .end(function (err, res) {
//             if (err) {
//                 console.log(err);
//             } else {
//               expect(res.status).to.equal(200);
//             }
//             done();
//         });
//     });
//   }); 
  
//   describe('get track', function () {
//     it('valid ', function (done) {
//         this.timeout(100000);//note it may take more so if it doesnot work increase the time
//         request.get('/track/5ee0a52112fb5846352459e7')
//             .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWUwMDE1ZGQ4YjY5MTNiOWE5NTBkZTYiLCJuYW1lIjoibmFuY3k5ODg4ODgiLCJpYXQiOjE1OTE3Mzg3MTd9.3HI6clQkPNRxQlq2W1FfW8ZoVcGsAddRd5HlQVAjrVQ')
//             .end(function (err, res) {
//             if (err) {
//                 console.log(err);
//             } else {
//               expect(res.status).to.equal(200);
//             }
//             done();
//         });
//     });
//   }); 

