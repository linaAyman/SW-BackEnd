var expect = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const AlbumController = require('../controllers/albumController');




describe("validate AlbumSchema ", function () {
  it('valid AlbumSchema Test#1', function () {
    let body = {
      genre: ['classic','rock'],
      name: 'wa7shteny',
      artist: 'Amr Diab',
      music: ['Uploads/Passenger Let Her Go.mp3', 'Uploads/Amr Diab wa75teny.mp3'],
      image: ['Images/FB_IMG_1560785471157.jpg',  'Images/images.jpg'],
      albumType:'single'
    }
    let result = AlbumController.validateAlbum(body)
    expect(result).to.validate;
  });

 it('notvalid AlbumSchema Test#2', function () {
    let body = {
      genre: [1223],
      name: 'wa7shteny',
      artist: 'Amr Diab',
      music: ['Uploads/Passenger Let Her Go.mp3', 'Uploads/Amr Diab wa75teny.mp3'],
      image: [],
      albumType:'single'
    }
    let result = AlbumController.validateAlbum(body)
    expect(result).to.have.an.error;
  });
});
