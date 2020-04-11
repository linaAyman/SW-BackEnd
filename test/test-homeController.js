var expect  = require('chai').expect;
var should = require('chai').should();
var request = require('request');
const dotenv = require('dotenv');
const config = require('config');
const homeController=require('../controllers/homeController')
const getCategories=require('../controllers/homeController')
dotenv.config();




it('Home Request #4', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/home',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
       ///console.log(reqBody)
       reqBody.should.have.property('Home').with.lengthOf(5);
      
       should.exist(reqBody.Home[0].playlists);
       should.exist(reqBody.Home[1].playlists);
       should.exist(reqBody.Home[2].playlists);
       should.exist(reqBody.Home[3].playlists);
       should.exist(reqBody.Home[4].albums);
  
        }
    });
});
it('See All Home Request #3', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/home/Chill',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        ///console.log(reqBody)
       (reqBody.category).should.have.property('playlists').with.lengthOf(10);
       
       expect(reqBody.category.name).to.equal("Chill")
        }
    });
});
it('See All Home Request for name that does not exist #3', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/home/Chio',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
       //(body.body.ca).should.have.property('playlists').with.lengthOf(10);
       expect(reqBody.message).to.equal("sorry this is not supported")
        }
    });
});
it('See All Home Request Popular Playlists#4', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/home/Most%20Popular%20Playlists',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        console.log(reqBody)
        reqBody.should.have.property('playlists').with.lengthOf(10);
        }
    });
});
it('See All Home Request New Albums#4', function() {
    const options = {
        method:'GET',
        url: 'http://3.137.69.49:3000/home/Released%20Albums',
      };
    request(options, function(error, response, body) {
       if(body)
       {
        var reqBody =body.toString('utf8');
        reqBody = JSON.parse(reqBody);
        ///console.log(reqBody)
        reqBody.should.have.property('albums').with.lengthOf(2);
        expect(reqBody.albums[0].name).to.equal("songs for carmella: lullabies & sing-a-longs");
        expect(reqBody.albums[1].name).to.equal("Girls Like You (feat. Cardi B)");

        }
    });
});

/*describe('getCategories',()=>{
    context('on success',()=>{
        it('Get  Chill', (done)=>{
    ///this.timeout(10000);
    //console.log("JIIIIIIIIIIIIIIIIIIIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    //homeController.getCategories().returns(Promise.resolve([{}]));
    //returns getCategories().then
    getCategories().then((home)=>{
        console.log(home)
        //expect(home[0].name).to.equal("Chill")
     
    })
    });
});
})*/
    
    //console.log(home[1])
   // console.log(home[2])
    
            // expect(home).to.
