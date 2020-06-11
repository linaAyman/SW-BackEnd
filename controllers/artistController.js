/**
 * 
 * @module artistController
 */

/**
 * A model for artist 
 * @model artist
 */

const  {Artist} =require('../models/Artist')
const  {Track} =require('../models/Track')
const  {Album} =require('../models/Album')
const  {Statistics} =require('../models/Statistics')
const  {PlayHistory} =require('../models/PlayHistory')
const  {YourLikedSongs} =require('../models/YourLikedSongs')
const  User =require('../models/User')
const trackController = require("../controllers/trackController");
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
 * Get the artist's most popular tracks
 * @param {URL} req -send artist Id
 * @param {object} res -the response on the given request
 * @returns {jsonObject} - Object of type tracks else a message if tracks has not been found for the artist
 */
exports.artistTopTracks = async function (req,res) {
        let artist = req.params.artistId
        let artistId = await Artist.findOne({id: artist}, {'_id':1})

        let  artistTracks = await Track.find({artists: artistId}, {'name':1,'popularity':1})
                                       .sort({popularity:-1});
                                       console.log(artistTracks)

        if (artistTracks.length == 0)
        return res.status(404).send({ message: "No tracks for such artist" });

        return res.status(200).send(artistTracks);
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
 * Get the statistics of the played track or the album of the artist
 * @param {URL} req -send artist Id
 * @param {object} res -the response on the given request
 * @returns {jsonObject} - Object of type statistics else a message if the artist Id or the play has not been found
 */
exports.statistics = async function (req,res) {
        const artistId = await Artist.findOne({ id: req.params.artistId }, {'_id':1});

        let playId = req.params.id
        if (artistId && playId) {
                let playedItem;
                let likedTrack;
                let likeNo;
                playedItemT=await Track.findOne({id:playId},{'_id':1,'type':1}); // the playId is either track or album 
                playedItemA=await Album.findOne({id:playId},{'_id':1,'type':1}); // it cannot be both, the request will accept it

                if(playedItemT) {
                likedTrack=await YourLikedSongs.find({tracks: playedItemT})
                likeNo=likedTrack.length;
                playedItem = playedItemT;
                }
                else if (playedItemA)
                playedItem=playedItemA;
                else
                res.status(404).json({'type':'The type you sent was incorrect'});
                
                let listenerNo=await PlayHistory.findOne({History:{$elemMatch:{id:playedItem}}}, {'HistoryLen':1,'_id':0})
                if (listenerNo == null)
                listenerNo = 0;

                let statistics;
                let existingStatistics = await Statistics.findOne({artist: artistId});
                if (existingStatistics != null) {
                statistics=await Statistics.findOneAndUpdate({artist:artistId},{$set:{listenersNo:listenerNo,likesNo:likeNo}})
               } else {
                 statistics = new Statistics ({
                        artist: artistId,
                        listenersNo: listenerNo,
                        likesNo: likeNo
                })
                }
                return res.status(200).send(statistics);
        } else {
                return res.status(404).send({ message: "artistId haven't been sent in the request" });
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