const joi = require('joi')
const {Follow} = require('../models/Follow')
const {Artist} = require('../models/Artist')
const User = require('../models/User')
const notificationController = require('../controllers/notificationController')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config();

//------------------Create the "Follow" library after user sign up---------------------//
/**
 * @memberof module:followController
 * @function {createFollow} to create an empty "follow" Library once the user signed up successfully
 * @param {objectId} userId user that we want to create "follow" library for
 *
 */
exports.createFollow =async function (userId)
{
    let followingTemp=[];
    const yourFollowingIds = new Follow ({
            followingIds: followingTemp,
            user: userId
    });
    yourFollowingIds.save()
}

//------------------Make the Follow Action---------------------//
/**
 * @memberof module:followController
 * @function {addFollow} makes the follow action from a certain user to the requested user
 * @param {req.headers.authorization} token to get objectId of the user from
 * @param {req.params.id} id userId that user want to follow it
 */
exports.addFollow = async (req, res)=> {
    let userToFollow=req.params.id;
    if(!userToFollow) return res.status(404).send({ message: "artistId haven't been sent in the request" })

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    let uID = decoded._id;
    let user = await User.findOne({_id: uID}, {'type':1,'_id':0})

    if (user.type == 'user') {
    let followingTemp = await User.findOne({maestroId: userToFollow}, {'_id':1})
    if (followingTemp == uID)
    return res.status(400).json({message :'Follow action can not be done to current user'})
    
    await Follow.findOneAndUpdate({ user: uID},{$addToSet: {followingIds: followingTemp._id}});
    await Follow.findOneAndUpdate({ user: followingTemp._id},{$addToSet: {followerIds: uID}});
    notificationController.addFollowNotification(uID,followingTemp)
    return res.status(201).json({message :'OK'})
    } else if (user.type == 'artist') {
        return res.status(400).json({message :'Follow action can not be done by Artist'}) 
    }
};

//------------------Get user's followers & people they follow---------------------//
/**
 * @memberof module:followController
 * @function {getFollowIds} get following & followers of the user
 * @param {req.headers.authorization} token to get objectId of the user from
 */
exports.getFollowIds = async function(req,res){

    const token = req.headers.authorization.split(" ")[1];
    if(token){   
          const decoded = jwt.decode(token);
          let followingTemp = await Follow.findOne({user:decoded._id},{'followingIds':1,'user':1,'followerIds':1,'_id':0});
          let following = await User.find({_id:followingTemp.followingIds},{'name':1,'_id':0})
          let followers = await User.find({_id:followingTemp.followerIds},{'name':1,'_id':0})
          let follow = {following, followers}
          return res.status(200).json({follow})
    }
}

//------------------Make the Unfollow Action---------------------//
/**
 * @memberof module:followController
 * @function {unfollow} user unfollows another rquested user
 * @param {req.headers.authorization} token to get objectId of the user from
 * @param {req.params.id} id userId that user want to remove it
 */
exports.unfollow = async function (req, res) {

if (!req.params.id) return res.status(404).send({ msg: "userId haven't been sent in the request" })
    console.log(req.params.id)

    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.decode(token);
      let followingTemp = await User.findOne({maestroId: req.params.id }, {'_id': 1})
      if (followingTemp == decoded._id)
      return res.status(400).json({message :'Unfollow action can not be done to current user'})

      await Follow.updateOne({ user: decoded._id }, { $pull: {followingIds: followingTemp._id} });
      await Follow.updateOne({user: followingTemp}, {$pull: {followerIds: decoded._id}})
      return res.status(200).json({ "message": 'Deleted Successfully' })
    }
  }