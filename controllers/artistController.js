/**
 * 
 * @module artistController
 */

/**
 * A model for artist 
 * @model artist
 */

const  {Artist} =require('../models/Artist')
/**
 * @async 
 * @function
 * Get all information about the artist
 * @param {URL} req -send artist Id
 * @param {object} res -the response on the given request
 * @returns {jsonObject} - Object of type artist
 */
exports.getArtist = async function (req,res){
       
        let temp = req.params.id;
        let artist = await Artist.find({id: temp},{'id':1,'name':1,'image':1});
        if (artist){
        return res.send(artist);
        } 
   
}

/**
 * @async 
 * @function
 * Get the description of the artist
 * @param {URL} req -send artist Id
 * @param {object} res -the response on the given request
 * @returns {jsonObject} - Object of type artist else a message if the artist Id has not been found
 */
exports.artistAbout = async function (req,res){
       
        let temp = req.params.id;
        if (!temp) return res.status(404).send({ message: "artistId haven't been sent in the request" });

        let artist = await Artist.find({id: temp},{'id':1,'name':1,'image':1, 'about':1});
        if (artist){
        return res.send(artist);
        }
}

/**
 * @async 
 * @function
 * Get the description of the artist
 * @param {URL} req -send artist Id
 * @param {object} res -the response on the given request
 * @returns {jsonObject} - Object of type artist else a message if the artist Id has not been found
 */
exports.getrelatedArtist = async function (req,res){
       
        let artistId = req.params.id;
        if (!artistId) return res.status(404).send({ message: "artistId haven't been sent in the request" });

        let artistGenres = await Artist.find({id: artistId},{'_id':0,'genres':1});
        if (artistGenres){
                console.log(artistGenres)
                let Genres = artistGenres[0].genres
               console.log(Genres.length)
                let RelatedArtists 
                let i;
                for (i = 0; i < Genres.length; i++) {
                        let temp1  = await Artist.find({genres:Genres[i]})
                        temp1.forEach(async function (value,index){
                        let tempArtist = value;
                        console.log(i+" Temp artist "+tempArtist)
                        if(tempArtist.id == artistId){
                                temp1.splice(index,1)
                        }
                        if(i!=0){
                                
                                RelatedArtists = RelatedArtists.filter(function( obj ) {
                                        return obj.id !== tempArtist.id;
                                });
                        }
                        });
                        if(i==0){
                                RelatedArtists = (temp1)
                        }
                }
               res.send(RelatedArtists)
        }
}
function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};
   
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
   
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
    }
   

// exports.artistTopTracks = async function (req,res){
       
//         let temp = req.params.id;
//         if (!temp) return res.status(404).send({ message: "artistId haven't been sent in the request" });

//         let artist = await Artist.find({id: temp},{'id':1,'name':1,'image':1, 'about':1});
//         if (artist){
//         return res.send(artist);
//         }
// }