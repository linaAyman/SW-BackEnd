const { Search, validateSearch } = require('../models/Search')
const { Track }=require('../models/Track')
const { Artist}=require('../models/Artist')
const { Album }=require('../models/Album')
const jwt = require('jsonwebtoken')



//-------------------------------------------------Search Feature-------------------------------//
//------------------- get /search
//----returns object of 3 arrays 
exports.search=async function(req,res){
    console.log(req.query)
    const { error } = validateSearch(req.query)
    if (error) return res.status(400).send({ msg: error.details[0].message })


        let query = req.query.query
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)

        if(token)
        {
            const decoded = jwt.decode(token);
            let exactMatch=false
            if(query.charAt(0)=='"'&&query.charAt(query.length-1)=='"')
                exactMatch=true

        
            const search = new Search({
                userId: decoded._id,
                query: query
            })
            await search.save()
            console.log(exactMatch)
            
            
            let trackResult=[]
            let artistResult=[]
            let albumResult=[]
        
            
            if(!exactMatch)
            {
                trackResult=await Track
                    .find({$text:{$search:query}},{ score: { $meta: "textScore" },name:'name',type:'type' ,'_id':0})
                    .sort({ score: { $meta: "textScore" } })
                    .populate('artists_id','name');
                
                artistResult=await Artist
                    .find({name:new RegExp('.*' + query + '.*', 'i')},{name:'name',type:'type',images:'images','_id':0});

                albumResult=await Album
                    .find({$text:{$search:query}},{ score: { $meta: "textScore" },name:'name',type:'type' ,'_id':0,images:'images'})
                    .sort({ score: { $meta: "textScore" } })
                    .populate('artists','name');

                console.log(trackResult);
            }
            else
            {
                let temp=query.substr(1,query.length-2)

                searchResult=await Track
                    .find({name:temp},{'_id':0,name:'name',type:'type'})
                    .populate('artists_id','name');

                searchResult.push(await Artist
                    .find({name:new RegExp('.*' + temp+ '.*', 'i')},{name:'name',type:'type',images:'images','_id':0}));

                searchResult.push(await Album
                    .find({name:temp},{name:'name',type:'type' ,'_id':0,images:'images'})
                    .populate('artists','name'))
        
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
