
/**
*@module searchController
*/

const { Search, validateSearch } = require('../models/Search')
const { Track }=require('../models/Track')
const { Artist}=require('../models/Artist')
const { Album }=require('../models/Album')
const {Playlist}= require('../models/Playlist')
const User =require('../models/User')
const jwt = require('jsonwebtoken')



//-------------------------------------------------Search Feature-------------------------------//
//------------------- get /search
//----returns object of 3 arrays 
/**
 * searchController search
 * @memberof module:searchController
 * @function {search} searches for artists/albums/tracks either by a regular expression of by exact match
 * @param {req.headers.authorization} token to identify user and use hos id later in saving recent search
 * @param {string} req.query.query string to search for it
 * @returns {arrayOfArrays} searchResult(trackResult,artistResult,albumResult) 
 */
exports.search=async function search(req,res){
    
    const { error } = validateSearch(req.query)
    if (error) return res.status(400).send({ msg: error.details[0].message })


        let query = req.query.query
        // const token = req.headers.authorization.split(" ")[1];

        // ///if(token){
        //     const decoded = jwt.decode(token);
            let exactMatch=false
            if(query.charAt(0)=='"'&&query.charAt(query.length-1)=='"')
                exactMatch=true

        
           /*const search = new Search({
                userId: decoded._id,
                query: query
            })
            await search.save()
            console.log(exactMatch)*/
        
            
            
            let trackResult=[]
            let artistResult=[]
            let albumResult=[]
            let playlistResult=[]
            let userResult=[]
            let topResults=[]
            let TopResult;
           
            
            if(!exactMatch){

            
                trackResult=await Track
                                    .find({$text:{$search:query}},{ score: { $meta: "textScore" },'name':1,'id':1,'type':1,'image' :1,'_id':0})
                                    .sort({ score: { $meta: "textScore" } })
                                    .populate('artists','name id');
                if(trackResult.length>0)
                    topResults.push(trackResult[0]);
                  
                artistResult=await Artist
                                    .find({name:new RegExp('.*' + query + '.*', 'i')},{'name':1,'id':1,'type':1,'image':1,'_id':0});

                                  
                albumResult=await Album
                                    .find({$text:{$search:query}},{ score: { $meta: "textScore" },'name':1,'id':1,'type':1 ,'image':1,'_id':0})
                                    .sort({ score: { $meta: "textScore" } })
                                    .populate('artists','name id -_id');
                                    
                if(albumResult.length>0) 
                    topResults.push(albumResult[0])

                playlistResult= await Playlist
                                        .find({$text:{$search:query}},{ score: { $meta: "textScore" },'name':1,'id':1,'type':1,'image' :1,'description':1,'_id':0})
                                        .sort({ score: { $meta: "textScore" } })
                                        .populate('owner','name -_id');

                if(playlistResult.length>0)
                    topResults.push(playlistResult[0])

                userResult=await User.find({name:query},{'name':1,'_id':1,'type':1,'image':1})
              

                if(topResults.length>0){
                    TopResult = topResults.reduce((prev, current) => (+prev.id > +current.id) ? prev : current)
                  
                }
                else if (artistResult.length>0) {
                    TopResult=artistResult[0];
                    
                } 
                else {
                    TopResult=userResult[0];
                    
                }
                
            }
            else{
                let temp=query.substr(1,query.length-2)
                console.log(temp)
                trackResult=await Track
                                    .find({name:temp},{'_id':0,'name':1,'image':1,'id':1,'type':1})
                                    .populate('artists','name id -_id');

                artistResult=await Artist
                                    .find({name:new RegExp('.*' + temp+ '.*', 'i')},{name:'name','id':1,type:'type',images:'images','_id':0});

                albumResult=await Album
                                    .find({name:temp},{'name':1,'id':1,'type':1 ,'image':1,'_id':0})
                                    .populate('artists','name id -_id')

                playlistResult=await Playlist
                                        .find({name:temp},{'name':1,'id':1,'type':1,'image':1,'description':1,'_id':0})
                                        .populate('owner','name -_id')
                
                
                console.log(temp)
                userResult=await User.find({name:temp},{'name':1,'_id':1,'type':1,'image':1})
        
            }
            
             //get name of the artists that appeared in search result of artist collection
            // and get the most 3 popular tracks for them
            if(artistResult.length>0){
                let tempArtists=await Artist.findOne({name:artistResult[0].name},{'_id':1})
                console.log(tempArtists)

                let tracksArtist=await Track
                                        .find({artists:tempArtists},{'name':1,'id':1,'type':1,'image' :1,'_id':0})
                                        .limit(3)
                                        .sort({popularity:1})

                trackResult=trackResult.concat(tracksArtist)

                let albumArtist=await Album
                                        .find({artists:tempArtists},{'name':1,'id':1,'type':1,'image' :1,'_id':0})

                albumResult=albumResult.concat(albumArtist)

            }
            
            var searchResult={
                TopResult:TopResult,
                albumResult:albumResult,
                trackResult:trackResult,
                artistResult:artistResult,
                playlistResult:playlistResult,
                userResult:userResult
                
            };
            return res.send(searchResult)
}
//-------------------------------Save Recent Search-------------------------///////

exports.saveSearch=async function(req,res){


    let id=req.query.id
    console.log(id)
    let type=req.query.type
    console.log(type)
    const token = req.headers.authorization.split(" ")[1];
    //get object Id of searched Item
    
    let searchedObjectId
    
    if(token){
        const decoded = jwt.decode(token);
        if(type=="playlist"){
            //find objectID of searched Item
            searchedObjectId=await Playlist.findOne({id:id},{"_id":1})
        }
        else if(type=="track"){
            searchedObjectId=await Track.findOne({id:id},{"_id":1})
        }
        else if(type=="artist"){
            searchedObjectId=await Artist.findOne({id:id},{"_id":1})
        }
        else if(type=="user"){
            searchedObjectId=await User.findOne({id:id},{"_id":1})
        }
        else if(type=="album"){
            searchedObjectId=await Album.findOne({id:id},{"_id":1})
        }
        else{
            return res.json({message:"This type you sent doesn't exist"})
        }

        if(searchedObjectId==undefined){
            res.status(400).json({message:"This type doesn't match given"})
        }
        
        
        
        let isSearchExist=await Search.findOne({userId:decoded._id})
        let searchedObject={
            id:searchedObjectId,
            type:type
        }
        if(!isSearchExist){
            
            let recentSearchedItems=[];
            recentSearchedItems.push(searchedObject)
            console.log(recentSearchedItems)
            const search = new Search({
                    userId: decoded._id,
                    searchedItems:recentSearchedItems
            })
            console.log(search)
            await search.save()
        }
        else{
            //check if this search exist before and delete it to save the new search about this item
            let item=await Search.findOne({userId:decoded._id,searchedItems:{$elemMatch:{id:searchedObjectId}}})
            await Search.findOneAndUpdate({userId:decoded._id},{"$pull":{"searchedItems":{id:searchedObjectId}}})
            await Search.findOneAndUpdate({userId:decoded._id},{$push:{searchedItems:{$each:[searchedObject],$position:0}}})
            if(!item)await Search.updateOne({userId:decoded._id},{$inc:{countSearchedItems:1}})
        }

            res.status(200).json({message:"OK"})
        }
}
//============================================================get recent Search==============================/////////
exports.getRecentSearch=async function(req,res){
    const token = req.headers.authorization.split(" ")[1];
    var offset=req.query.offset
    var limit=req.query.limit
    //let searchedItems=[];
    
    if(token){
        const decoded = jwt.decode(token);
        if(!offset) offset=0;
        if(!limit)  limit=6;
        console.log(offset)
        console.log(limit)
        //get a range from searchedItems array for pagination
        let recentSearches=(await Search
                                .findOne({userId:decoded._id},{searchedItems:{"$slice":[Math.abs(offset),Math.abs(limit)]}}))
                                console.log(recentSearches)
        let  recentSearchResult=[] 
        if(recentSearches!=null){
            let recentSearch=recentSearches.searchedItems
           
            //iterate over documents of recent search to get their _id               
            for(let i =0;i<recentSearch.length;i++){
                if(recentSearch[i].type=="track"){
                    recentSearchResult.push(await Track
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'type':1,'image':1,'artists':1,'_id':0})
                                        .populate('artists','name id -_id'))

                }
                else if(recentSearch[i].type=="playlist"){
                    recentSearchResult.push(await Playlist
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'description':1,'owner':1,'type':1,'image':1,'artists':1,'_id':0})
                                        .populate('owner','name -_id'))

                }
                else if(recentSearch[i].type=="album"){
                    recentSearchResult.push(await Album
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'type':1,'image':1,'artists':1,'_id':0})
                                        .populate('artists','name id -_id'))

                }
                else if(recentSearch[i].type=="artist"){
                    recentSearchResult.push(await Artist
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'type':1,'image':1,'_id':0}))

                }
                else{
                    recentSearchResult.push(await User
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'type':1,'image':1,'_id':0}))
                }
            }
        } 
        var countSearchedItems=0;                           
        if(recentSearches!=null) {
            countSearchedItems=recentSearches.countSearchedItems
        }
        res.status(200).json({recentSearch:recentSearchResult,count:countSearchedItems})
    }
    else{
        return 
    }

}
///==============================Delete Item form recent Search========================///
exports.deleteSearch=async function(req,res){
    const token = req.headers.authorization.split(" ")[1];
   
    
    
    if(token){
        const id=req.query.id;
        if(!id) res.status(400).json({message:"You haven't sent the id for item you want to delete"})
        const type=req.query.type;
        const decoded = jwt.decode(token);
        let deletedItemId;//object id of the item you want to delete
        if(type=="track")
            deletedItemId=await Track.findOne({id:id},{'_id':1});
        else if(type=="playlist")
            deletedItemId=await Playlist.findOne({id:id},{'_id':1});
        else if (type=="artist")
            deletedItemId=await Artist.findOne({id:id},{'_id':1});
        else if(type=="user")
            deletedItemId=await User.findOne({id:id},{'_id':1});
        else if(type=="album")
            deletedItemId=await Album.findOne({id:id},{'_id':1});
        else
            res.status(400).json({message:"This Type doesn't exist"})

        if(!deletedItemId){console.log("The given id doesn't match the type")}

        await Search.findOneAndUpdate({userId:decoded._id},{"$pull":{"searchedItems":{id:deletedItemId}}})
        await Search.updateOne({userId:decoded._id},{$inc:{countSearchedItems:-1}})
        res.status(200).json({message:"OK"})

    }
    else
        return
}
//========================Delete all the Recent Search=================//////

exports.deleteAllSearch=async function(req,res){
    const token = req.headers.authorization.split(" ")[1];
    
    
    if(token){
        const decoded = jwt.decode(token);
        await Search.deleteOne({userId:decoded._id})
        res.status(200).json({message:"OK"})
    }
    else{
        return
    }

}