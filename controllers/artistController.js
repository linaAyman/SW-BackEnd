/**
 * 
 * @module artistController
 */

/**
 * A model for artist 
 * @model artist
 */

const { Artist}=require('../models/Artist')
/**
 * @async 
 * @function
 * Get all information about the artist
 * @param {URL} req -send artist Id
 * @param {object} res -the response on the given request
 * @returns {jsonObject} - Object of type artist
 */
exports.getArtist = async function (req,res){
       /**
         * parsing the request to get artist id from it 
         * @member query
         * @member temp
         */
        let temp = req.params.id;
          /**
         * awaits finded data by request from database
         * @member {artist}
         * @type {Artist}
         */
        let artist = await Artist.find({id: temp},{'id':1,'name':1,'image':1});
        /**
         * if the artist exists in database, return it
         */
        if (artist){
        return res.send(artist);
        } 
   
}