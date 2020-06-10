var chai= require('chai');
var expect = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
dotenv.config();
const trackController = require("../controllers/trackController");
chai.should();

describe("validate TrackSchema ", function () {
  it('valid TrackSchema Test#1', function () {
    let body = {
      genre: 'classic',
      name: 'wa7shteny',
      artist: ['Amr Diab'],
      music: 'Uploads/Passenger Let Her Go.mp3',
      image: 'Images/FB_IMG_1560785471157.jpg'
    }
    let result = trackController.validateSong(body)
    let msg;
    if(result.error!=  null){
           msg = 'Error happened in Test#1'
    }
    else{
           msg = 'Done'
    }
  
      expect(msg).to.equal('Done');
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
    let msg;
    if(result.error!=  null){
           msg = 'Error happened in Test#2'
    }
    else{
           msg = 'Done'
    }
  
      expect(msg).to.equal('Error happened in Test#2');
  });
  it('notvalid TrackSchema Test#3', function () {
    let body = {
      genre: '',
      name: 'wa7shteny',
      artist: ['1234'],
      music: 'Uploads/Passenger Let Her Go.mp3',
      image: 'Images/FB_IMG_1560785471157.jpg'
    }
    let result = trackController.validateSong(body)
    let msg;
    if(result.error!=  null){
           msg = 'Error happened in Test#3'
    }
    else{
           msg = 'Done'
    }
  
      expect(msg).to.equal('Error happened in Test#3');
  });
});



