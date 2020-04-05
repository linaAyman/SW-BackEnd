const { Artist}=require('../models/Artist')

exports.getArtist = async function (req,res){
       
        let query = req.baseUrl;
        let temp = query.substr(8,query.length-2);
        let artist = await Artist.find({id: temp});
        if (artist){
        return res.send(artist);
        } 
   
}