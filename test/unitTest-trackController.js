/* var expect = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const trackController = require("../controllers/trackControllers");

describe("validate TrackSchema ", function () {
  it('valid TrackSchema Test#1', function () {
    let body = {
      genre: 'classic',
      name: 'wa7shteny',
      artist: 'Amr Diab',
      music: 'Uploads/Passenger Let Her Go.mp3',
      image: 'Images/FB_IMG_1560785471157.jpg'
    }
    let result = trackController.validateSong(body)
    expect(result).to.validate;
  });

  it('notvalid TrackSchema Test#2', function () {
    let body = {
      genre: 'classic',
      name: 'wa7shteny',
      artist: 'Amr Diab',
     music: 'Uploads/Passenger Let Her Go.mp3',
      image: ''
    }
    let result = trackController.validateSong(body)
    expect(result).to.have.an.error;
  });
  it('notvalid TrackSchema Test#3', function () {
    let body = {
      genre: 'classic',
      name: 'wa7shteny',
      artist: '1234',
      music: 'Uploads/Passenger Let Her Go.mp3',
      image: 'Images/FB_IMG_1560785471157.jpg'
    }
    let result = trackController.validateSong(body)
    expect(result).to.have.an.error;
  });
});
 */