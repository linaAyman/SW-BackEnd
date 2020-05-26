const joi = require('joi')
const {Follow} = require('../models/Follow')
const {Artist} = require('../models/Artist')
const notificationController = require('../controllers/notificationController')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config();

exports.createFollow =async function (userId)
{
    let followingTemp=[];
    const yourFollowingIds = new Follow ({
            followingIds: followingTemp,
            user: userId
    });
    yourFollowingIds.save()
}

exports.addFollow = async (req, res)=> {
    let artistToFollow=req.params.id;
    if(!artistToFollow) return res.status(404).send({ message: "artistId haven't been sent in the request" })

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    let uID = decoded._id;

    let followingTemp = await Artist.findOne({id: req.params.id}, {'_id':1})
    console.log(followingTemp)

    await Follow.findOneAndUpdate({ user: decoded._id},{$addToSet: {followingIds: followingTemp._id}});
    notificationController.addFollowNotification(uID,followingTemp)
    return res.status(201).json({message :'OK'})
};

exports.getFollowingIds = async function(req,res){

    const token = req.headers.authorization.split(" ")[1];
    if(token){   
          const decoded = jwt.decode(token);
          let followingTemp = await Follow.findOne({user:decoded._id},{'followingIds':1,'user':1, '_id':0})
          return res.status(200).json({followingTemp})
    }
}