
/**
*@module searchController
*/

const { Search, validateSearch } = require('../models/Search')
const { Track }=require('../models/Track')
const { Artist}=require('../models/Artist')
const { Album }=require('../models/Album')
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
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)

        if(token){
            const decoded = jwt.decode(token);
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
        
            
            if(!exactMatch){

                trackResult=await Track
                                    .find({$text:{$search:query}},{ score: { $meta: "textScore" },name:'name','id':1,type:'type' ,'_id':0})
                                    .sort({ score: { $meta: "textScore" } })
                                    .populate('artists','name');
                
                artistResult=await Artist
                                        .find({name:new RegExp('.*' + query + '.*', 'i')},{name:'name','id':1,type:'type',images:'image','_id':0});

                albumResult=await Album
                                    .find({$text:{$search:query}},{ score: { $meta: "textScore" },name:'name','id':1,type:'type' ,'_id':0,images:'image'})
                                    .sort({ score: { $meta: "textScore" } })
                                    .populate('artists','name -_id');

                console.log(trackResult);
            }
            else{
                let temp=query.substr(1,query.length-2)

                searchResult=await Track
                                    .find({name:temp},{'_id':0,name:'name','id':1,type:'type'})
                                    .populate('artists','name -_id');

                searchResult.push(await Artist
                                            .find({name:new RegExp('.*' + temp+ '.*', 'i')},{name:'name','id':1,type:'type',images:'images','_id':0}));

                searchResult.push(await Album
                                            .find({name:temp},{name:'name','id':1,type:'type' ,'_id':0,images:'images'})
                                            .populate('artists','name -_id'))
        
            }
            var searchResult={
                trackResult:trackResult,
                artistResult:artistResult,
                albumResult:albumResult
            };
            return res.send(searchResult)
    }
    else{
        return 
    }
}
//-------------------------------Recent Search-------------------------///////
