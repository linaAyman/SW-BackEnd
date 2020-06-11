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
