const { Artist}=require('../models/Artist')

exports.getArtist = async function (req,res){

        let artist = await Artist.find({id: req.params.id})
       
        res.send(artist)
       
}