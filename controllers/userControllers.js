const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//this used for hashing the passwords to provide more secuirty
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const User = require('../models/User')
const env = require('dotenv').config();
const fs = require('fs');
const imgPath = './public/profileImage/default.jpg';
const {Playlist} = require('../models/Playlist')



function joiValidate (req) {

	const schema = {
		name: Joi.string().min(3).max(30).required(),
		password: Joi.string().min(8).max(80).alphanum().required(),
    email: Joi.string().email().lowercase().required(),
    birthDate: Joi.date().required().min('1-1-1900').iso(),
    gender:Joi.boolean().required()
	}
	return Joi.validate(req, schema);
}


  exports.userSignup =   (req, res, next) => {
 
   const { error } = joiValidate(req.body)
   if (error)
    return res.status(400).send({ msg: error.details[0].message });

   User.find({ name: req.body.name  })
   .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Username already exists'
        });
      }  else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  error: err
                });
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  name:req.body.name,
                  email: req.body.email,
                  password: hash,
                  birthDate:req.body.birthDate,
                  gender:req.body.gender
                
                });
                user.uri= 'Maestro:User:'+ user._id.toString();
                user.href = 'https://api.Maestro.com/v1/users/'+ user._id.toString();
                user.externalUrls.value = 'https://open.Maestro.com/users/'+ user._id.toString();
                user.image.data = fs.readFileSync(imgPath);//just set the default image as its first sigup for the user
                user.image.contentType = 'jpg';
                const token = jwt.sign(
                  { _id: user._id,
                    name: user.name, 
                  },
                  process.env.JWTSECRET, 
                  {
                    expiresIn: '7d'
                  }

                );
              
                user
                  .save()
                  .then(result => {
                    console.log(result);
                    res.status(201).json({
                      message: 'User created',
                      token: token
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
              }
            });
          }
    
        });     
         
   
};

exports.userLogin = (req, res, next) => {
  User.findOne({ name: req.body.name })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          
          const token = jwt.sign(
            { _id: user._id,
              name: user.name, 
            },
            process.env.JWTSECRET,
            {
              expiresIn: '7d'
            }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.userDelete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.userLogout = (req, res, next) => {
   
    return res.status(200).json({
      message: 'logging out success'
     });

};


exports.userMailExist = (req, res, next) => {
 
  User.find({ email: req.params.mail})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists'
        });
      } else {
        return res.status(200).json({
          message: 'success'
        });
      }
    })
     .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.getCurrentUser = async (req,res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  let dID = decoded._id;
  let userInfo = await User
  .find({_id:dID}, {uri:0,_id:0, href:0,followersCount:0,type:0,providInfo:0,name:0,password:0,__v:0, createdAt:0,gender:0} );
  console.log(userInfo)
  return res.send(userInfo)
   
};

exports.getOtherUser = async function(req,res){
  
  console.log(req.params.id)
  OtherUserId = req.params.id;
 
  try{
  let otherUserInfo =  await User
  .find({'_id':OtherUserId}, {uri:0,externalUrls:0,type:0,href:0, providInfo:0,password:0,__v:0, createdAt:0,gender:0} );
  otherUserInfo
  .push( await Playlist
    .find( {'owner':OtherUserId}  , {_id:0,'id':1, 'name':1,'image':1}))
    
       
  return res.send(otherUserInfo)
    
  }catch{
    const error = new Error("No such user");
    error.status = 404;
    error.message= "No such user"
    return res.send(error)
  }
};