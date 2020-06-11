var expect  = require('chai').expect;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const process=require('process')
dotenv.config();
const AlbumController = require('../controllers/albumController');



it('Make Follow request from user to user', function(done) {
    const options = {
        method:'PUT',
        url: process.env.tempurl+'/follow/RlwiJzsiIJ6LzImA1BedZhtXcpTgz1',
        headers: {
            'Authorization': process.env.user_token
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

it('Make Follow request #2 from user to artist', function(done) {
    const options = {
        method:'PUT',
        url: process.env.tempurl+'/follow/70yz6gIPJp1BmrqQ0iWs3iWrtHtdXF',
        headers: {
            'Authorization': process.env.user_token
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

it('Make Follow request #3 from artist to user', function(done) {
    const options = {
        method:'PUT',
        url: process.env.tempurl+'/follow/RlwiJzsiIJ6LzImA1BedZhtXcpTgz1',
        headers: {
            'Authorization': process.env.artist_token
        }
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.message).to.equal("Follow action can not be done by Artist");
       }
       done();
    });
});

it('Make Follow request #4 from artist to artist', function(done) {
    const options = {
        method:'PUT',
        url: process.env.tempurl+'/follow/70yz6gIPJp1BmrqQ0iWs3iWrtHtdXF',
        headers: {
            'Authorization': process.env.artist_token
        }
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.message).to.equal("Follow action can not be done by Artist");
       }
       done();
    });
});

// it('Make Follow request #5 from user to same user', function(done) {
//     const options = {
//         method:'PUT',
//         url: process.env.tempurl+'/follow/70yz6gIPJp1BmrqQ0iWs3iWrtHtdXF',
//         headers: {
//             'Authorization': process.env.user_token
//         }
//     };
     
//     request(options, function(response, body) {
    
//        if(body)
//        {
//         var reqBody =body.body.toString('utf8');
//         reqBody = JSON.parse(reqBody);
//         expect(reqBody.message).to.equal("Follow action can not be done to current user");
//        }
//        done();
//     });
// });

it('Get others that user follows', function(done) {
        const options = {
            method:'GET',
            url: process.env.tempurl+'/follow/',
            headers: {
                'Authorization': process.env.user_token
            }
        };
         
        request(options, function(response, body) {
        
           if(body)
           {
            var reqBody =body.body.toString('utf8');
            reqBody = JSON.parse(reqBody);
            //console.log(reqBody.follow.following[0].name)
            expect(reqBody.follow.following[0].name).to.equal("hamaki")
           }
           done();
        });
    });

it('Get user followers', function(done) {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/follow/',
        headers: {
            'Authorization': process.env.user_token
        }
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        
        expect(reqBody.follow.followers[1].name).to.equal("alaaaa")
       }
       done();
    });
});

it('Unfollow request from user to artist', function(done) {
    const options = {
        method:'DELETE',
        url: process.env.tempurl+'/follow/70yz6gIPJp1BmrqQ0iWs3iWrtHtdXF',
        headers: {
            'Authorization': process.env.user_token
        }
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.message).to.equal("Deleted Successfully");
       }
       done();
    });
});

it('Get others that user follows after the unfollow', function(done) {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/follow/',
        headers: {
            'Authorization': process.env.user_token
        }
    };
     
    request(options, function(response, body) {
    
       if(body)
       {
        var reqBody =body.body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        expect(reqBody.follow.following[0].name).not.to.equal("hamaki")
       }
       done();
    });
});

// it('Get user followers after the unfollow', function(done) {
//     const options = {
//         method:'GET',
//         url: process.env.tempurl+'/follow/',
//         headers: {
//             'Authorization': process.env.artist_token
//         }
//     };
     
//     request(options, function(response, body) {
    
//        if(body)
//        {
//         var reqBody =body.body.toString('utf8');
//         reqBody = JSON.parse(reqBody);
        
//         expect(reqBody.follow.followers[1].name).not.to.equal("alaaaa")
//        }
//        done();
//     });
// });