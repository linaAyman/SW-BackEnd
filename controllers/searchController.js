const { Search, validateSearch } = require('../models/search')
const { Track }=require('../models/Track')
const { Artist}=require('../models/Artist')
const { Album }=require('../models/Album')




exports.search=async function(req,res){
    console.log(req.query)
    const { error } = validateSearch(req.query)
    if (error) return res.status(400).send({ msg: error.details[0].message })
    let query = req.query.query
    
    let exactMatch=false
    if(query.charAt(0)=='"'&&query.charAt(query.length-1)=='"')
        exactMatch=true

  
      const search = new Search({
        ///userId: decoded._id,
        query: query
      })
      await search.save()
      console.log(exactMatch)
  
      ///let searchResult = await Track.find({name : new RegExp('.*' + query + '.*', 'i')})
      let searchResult 
      //search for tracks
      if(!exactMatch)
       {
           
          searchResult= await Track.find({$text:{$search:query}},{ score: { $meta: "textScore" },name:'name',type:'type' ,'_id':0})
          .sort({ score: { $meta: "textScore" } }).populate('artists_id','name')//.project({"_id":0,"score":0,"artists_id._id":0})//populate('artists_id')

          searchResult.push(await Artist.find({name:new RegExp('.*' + query + '.*', 'i')},{name:'name',type:'type',images:'images','_id':0}))
      
          searchResult= await Album.find({$text:{$search:query}},{ score: { $meta: "textScore" },name:'name',type:'type' ,'_id':0,images:'images'})
          .sort({ score: { $meta: "textScore" } }).populate('artists','name')

       }
      else
      {
            let temp=query.substr(1,query.length-2)
            ///console.log(temp)
            searchResult=await Track.find({name:temp},{'_id':0,name:'name',type:'type'}).populate('artists_id','name')
            searchResult.push(await Artist.find({name:new RegExp('.*' + temp+ '.*', 'i')},{name:'name',type:'type',images:'images','_id':0}))

            searchResult= await Album.find({name:temp},{name:'name',type:'type' ,'_id':0,images:'images'}).populate('artists','name')
  
      }
      //search for artist
      

      return res.send(searchResult)

}