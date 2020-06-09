var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const process=require('process')
dotenv.config();

/*it('Make Follow request', function(done) {
    const options = {
        method:'PUT',
        url: 'http://3.137.69.49:3000/follow/pSGLvTNsaW9BrKb4DWwVhpH8ecJTlo',
        headers: {
            'Authorization': process.env.userToken
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
        url: 'http://3.137.69.49:3000/user/notifications',
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
});*/

it('Make Like Playlist action', function(done) {
    const options = {
        method:'PUT',
        url: 'http://3.137.69.49:3000/user/createPlaylist',
        headers: {
            'Authorization': process.env.userToken
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
it('Check Like Playlist Notification', function(done) {
    const options = {
        method:'PUT',
        url: 'http://3.137.69.49:3000/user/createPlaylist',
        headers: {
            'Authorization': process.env.userToken
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