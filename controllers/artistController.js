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
 * Get the artists that have same genre as requested artist
 * @param {URL} req -send artist Id
 * @param {object} res -the response on the given request
 * @returns {jsonObject} - Object of type artist else a message if the artist Id has not been found
 */
exports.getrelatedArtist = async function (req,res){
       
        let artistId = req.params.id;
        if (!artistId) return res.status(404).send({ message: "artistId haven't been sent in the request" });

        let artistGenres = await Artist.find({id: artistId},{'_id':0,'genres':1});
        if (artistGenres){
                let Genres = artistGenres[0].genres
                let RelatedArtists = []
                let i;
                for (i = 0; i < Genres.length; i++) {
                        // getting the artists for each genre in the required artist array
                       let temp1  = await Artist.find({genres:Genres[i]})
                       temp1.forEach(async function (value,index){
                        let tempArtist = value;
                        // checking that the requested artist not added in result
                        if(tempArtist.id != artistId){ 
                        //Checking no duplicates occur
                        if(i!=0){
                                RelatedArtists = RelatedArtists.filter(function( obj ) {
                                        return obj.id !== tempArtist.id;
                                });
                                }
                        RelatedArtists.push(tempArtist)
                        }
                        });
                }
               res.send(RelatedArtists)
        }
}
   

// exports.artistTopTracks = async function (req,res){
       
//         let temp = req.params.id;
//         if (!temp) return res.status(404).send({ message: "artistId haven't been sent in the request" });

//         let artist = await Artist.find({id: temp},{'id':1,'name':1,'image':1, 'about':1});
//         if (artist){
//         return res.send(artist);
//         }
// }