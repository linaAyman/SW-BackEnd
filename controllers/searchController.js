
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
const getOID=require('../middleware/getOID');



//-------------------------------------------------Search Feature-------------------------------//
//------------------- get /search
//----returns object of 3 arrays 
/**
 * searchController search
 * @memberof module:searchController
 * @function {search} searches for artists/albums/tracks either by a regular expression of by exact match
 * @param {string} req.query.query string to search for it
 * @returns {arrayOfArrays} searchResult(trackResult,artistResult,albumResult,playlistResult,userResult,TopResult) 
 */
exports.search=async function search(req,res){
    
    const { error } = validateSearch(req.query)
    if (error) return res.status(400).send({ msg: error.details[0].message })


        let query = req.query.query

            let exactMatch=false
            if(query.charAt(0)=='"'&&query.charAt(query.length-1)=='"')
                exactMatch=true


        
            
            
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
            //if search query is exact match
            else{
                let temp=query.substr(1,query.length-2)
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
                
                userResult=await User.find({name:temp},{'name':1,'_id':1,'type':1,'image':1})
        
            }
            
             //get name of the artists that appeared in search result of artist collection
            // and get the most 3 popular tracks for them
            if(artistResult.length>0){
                let tempArtists=await Artist.findOne({name:artistResult[0].name},{'_id':1})

                let tracksArtist=await Track
                                        .find({artists:tempArtists},{'name':1,'id':1,'type':1,'image' :1,'_id':0})
                                        .limit(3)
                                        .sort({popularity:-1})

                trackResult=trackResult.concat(tracksArtist)

                let albumArtist=await Album
                                        .find({artists:tempArtists},{'name':1,'id':1,'type':1,'image' :1,'_id':0})
                                        .limit(3)
                                        .sort({popularity:-1})

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

/**
 *  searchController saveSearch
 * @memberof module:searchController
 * @function {saveSearch} save search action for current logged in user to vuew it in recent search
 * @param {req.headers.authorization} token to identify user and use his id later in saving recent search
 * @param {id} id of item that should be saved in recent search of user
 * @param {type} type of item that should be saved in recent search of user
 */

exports.saveSearch=async function(req,res){


    let id=req.query.id
    let type=req.query.type
    let userId=getOID(req); //get user's Object ID
    //get object Id of searched Item
    
    let searchedObjectId
        if(type=="Playlist"){
            searchedObjectId=await Playlist.findOne({id:id},{"_id":1})
        }
        else if(type=="Track"){
            searchedObjectId=await Track.findOne({id:id},{"_id":1})
        }
        else if(type=="Artist"){
            searchedObjectId=await Artist.findOne({id:id},{"_id":1})
        }
        else if(type=="User"){
            searchedObjectId=await User.findOne({id:id},{"_id":1})
        }
        else if(type=="Album"){
            searchedObjectId=await Album.findOne({id:id},{"_id":1})
        }
        else{
            return res.json({message:"This type you sent doesn't exist"})
        }

        if(searchedObjectId==undefined){
            res.status(400).json({message:"This type doesn't match given"})
        }
        
        
        //check if he has recent search as a document in database if not create a document for his recent search
        let isSearchExist=await Search.findOne({userId:userId})
        let searchedObject={
            id:searchedObjectId,
            type:type
        }
        
        if(!isSearchExist){
            
            let recentSearchedItems=[];
            recentSearchedItems.push(searchedObject)
            const search = new Search({
                    userId: userId,
                    searchedItems:recentSearchedItems
            })
            await search.save()
        }
        else{
            //check if this search exist before and delete it to save the new search about this item
            let item=await Search.findOne({userId:userId,searchedItems:{$elemMatch:{id:searchedObjectId}}})
            await Search.findOneAndUpdate({userId:userId},{"$pull":{"searchedItems":{id:searchedObjectId}}})
        // Recent search
            await Search.findOneAndUpdate({userId:userId},{$push:{searchedItems:{$each:[searchedObject],$position:0}}})
            if(!item)await Search.updateOne({userId:userId},{$inc:{countSearchedItems:1}})
        }

            res.status(200).json({message:"OK"})
        
}
//============================================================get recent Search==============================/////////
/**
 * searchController getRecentSearch
 * @memberof module:searchController
 * @function{getRecentSearch} get recent search ordered according to most recent search for current logged in user
 * @param {req.headers.Authorization} token of current logged in user
 * @param {offset} number of searchedItems to skip
 * @param {limit} number of searchedItems to view
 * @returns {recentSearch} array of searched Items
 * @returns {count} total numbers of searchedItems in the user's recent search
*/
exports.getRecentSearch=async function(req,res){
    var offset=req.query.offset
    var limit=req.query.limit
    let userId=getOID(req); //get user's Object ID
   
    
   
       
        if(!offset) offset=0;
        if(!limit)  limit=6;
        //get a range from searchedItems array for pagination
        let recentSearches=(await Search
                                .findOne({userId:userId},{searchedItems:{"$slice":[Math.abs(offset),Math.abs(limit)]}}))
                               
        let  recentSearchResult=[] 
        if(recentSearches!=null){
            let recentSearch=recentSearches.searchedItems
           
            //iterate over documents of recent search to get their _id               
            for(let i =0;i<recentSearch.length;i++){
                if(recentSearch[i].type=="Track"){
                    recentSearchResult.push(await Track
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'type':1,'image':1,'artists':1,'_id':0})
                                        .populate('artists','name id -_id'))

                }
                else if(recentSearch[i].type=="Playlist"){
                    recentSearchResult.push(await Playlist
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'description':1,'owner':1,'type':1,'image':1,'_id':0})
                                        .populate('owner','name -_id'))

                }
                else if(recentSearch[i].type=="Album"){
                    recentSearchResult.push(await Album
                                        .findOne({_id:recentSearch[i].id},{'name':1,'id':1,'type':1,'image':1,'artists':1,'_id':0})
                                        .populate('artists','name id -_id'))

                }
                else if(recentSearch[i].type=="Artist"){
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
///==============================Delete Item form recent Search========================///
/**
 * searchController deleteSearch
 * @memberof module:searchController
 * @function{deleteSearch} remove certain item from history search for current logged in user
 * @param {req.headers.Authorization} token for current logged in user
 * @param {id} id of item you want to remove from search history
 * @param {type} type of item you want to remove from search history
*/
exports.deleteSearch=async function(req,res){
 
        const id=req.query.id;
        let userId=getOID(req); 
        if(!id) res.status(400).json({message:"You haven't sent the id for item you want to delete"})
        const type=req.query.type;
        let deletedItemId;//object id of the item you want to delete
        if(type=="Track")
            deletedItemId=await Track.findOne({id:id},{'_id':1});
        else if(type=="Playlist")
            deletedItemId=await Playlist.findOne({id:id},{'_id':1});
        else if (type=="Artist")
            deletedItemId=await Artist.findOne({id:id},{'_id':1});
        else if(type=="User")
            deletedItemId=await User.findOne({id:id},{'_id':1});
        else if(type=="Album")
            deletedItemId=await Album.findOne({id:id},{'_id':1});
        else
            res.status(400).json({message:"This Type doesn't exist"})


        await Search.findOneAndUpdate({userId:userId},{"$pull":{"searchedItems":{id:deletedItemId}}})
        await Search.updateOne({userId:userId},{$inc:{countSearchedItems:-1}})
        res.status(200).json({message:"OK"})

   
}
//========================Delete all the Recent Search=================//////
/**
 * searchController deleteAllSearch
 * @memberof module:searchController
 * @function {deleteAllSearch} delete all search history for current logged in user
 * @param {req.headers.Authorization} token of current logged in user
*/
exports.deleteAllSearch=async function(req,res){
   
        let userId=getOID(req); 
        await Search.deleteOne({userId:userId})
        res.status(200).json({message:"OK"})

}