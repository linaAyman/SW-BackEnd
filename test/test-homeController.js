 var expect  = require('chai').expect;
var should = require('chai').should();
var assert=require('chai').assert;
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const process=require('process')
const homeController=require('../controllers/homeController')
const getCategories=require('../controllers/homeController')
dotenv.config();



///const tempurl='http://localhost:3000'+'/home';
it('Home Request #4', function() {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/home',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
      
       should.exist(reqBody.Home[0].playlists);
       should.exist(reqBody.Home[1].playlists);
       should.exist(reqBody.Home[2].playlists);
       should.exist(reqBody.Home[3].playlists);
  
        }
    });
});
it('Pagination for Home Category',function(){
  const options={
    method:'GET',
    url:process.env.tempurl+'/home/Chill?offset=2&limit=3',
  };
  request(options,function(error,response,body){
    if(body){
      var reqBody =body.toString('utf8');
      reqBody = JSON.parse(reqBody);
      reqBody.category.should.have.property('playlists').with.lengthOf(3);
      reqBody.category.playlists[0].name.should.equal('Peacful Mind');
      reqBody.category.playlists[1].name.should.equal('Rest');
      reqBody.category.playlists[2].name.should.equal('Sweet Moments');
      }
  });
});
it('Pagination for Most Popular',function(){
  const options={
    method:'GET',
    url:process.env.tempurl+'/home/Most%20Popular%20Playlists?offset=2&limit=4',
  };
  request(options,function(error,response,body){
    if(body){
      var reqBody =body.toString('utf8');
      reqBody = JSON.parse(reqBody);
      reqBody.should.have.property('playlists').with.lengthOf(4);
      reqBody.playlists[0].id.should.equal('4qrimFUz8KFC8W6WrDiDnh');
      reqBody.playlists[1].id.should.equal('4qrimFUz8KFC8W6WrDiDne');
      reqBody.playlists[2].id.should.equal('4qrimFUz8KFC8W6WrDiDng');
      reqBody.playlists[3].id.should.equal('4qrimFUz8KFC8W6WrDiDmc');
      }
  });
});
it('See All Home Request #3', function() {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/home/Chill',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
       reqBody.category.should.have.property('playlists').with.lengthOf(10);
       
       expect(reqBody.category.name).to.equal("Chill")
        }
    });
});
it('See All Home Request for name that does not exist #3', function() {
    const options = {
        method:'GET',
        url:process.env.tempurl+'/home/Chio',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
       expect(reqBody.message).to.equal("sorry this is not supported")
        }
    });
});
it('See All Home Request Popular Playlists#4', function() {
    const options = {
        method:'GET',
        url: process.env.tempurl+'/home/Most%20Popular%20Playlists',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        reqBody.should.have.property('playlists').with.lengthOf(6);
        }
    });
});
it('See All Home Request New Albums: Get Released Albums', function() {
    const options = {
        method:'GET',
        url: 'http://localhost:3000/home/Released%20Albums',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        reqBody.should.have.property('albums').with.lengthOf(2);
        console.log("Hello Arwa ----------------------- ")
        console.log(reqBody)
       /*  expect(reqBody.albums[0].name).to.equal("songs for carmella: lullabies & sing-a-longs");
        expect(reqBody.albums[1].name).to.equal("Girls Like You (feat. Cardi B)");
 */
        }
    });
});
 


 