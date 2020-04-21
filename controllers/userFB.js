/**
*@module controllers/userFB
*/
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('dotenv').config();
/**
* UserController signup/login with facebook
*@memberof module:controllers/userFB
*@param {object}   req     Express request object
*@param {object}   res     return 200 status and token if success /401 status
*/
module.exports = {
    facebookOAuth: async (req, res, next) => {

        if(!req.user) {
            return res.send(401, 'User not authenticated');
        }

        const token = jwt.sign(
            {
                 _id: req.user._id
            },
            process.env.JWTSECRET, 
            {
              expiresIn: '7d'
            }
          );
          User.updateOne({_id: req.user._id},{token: token})
          .exec()
          .then(result =>{
              return  res.status(200).json({
                message: 'User Entered',
                token: token
              });
           })
          .catch(err => {
            res.status(401).json({
              message: 'Auth failed'
            });
          });
    }
};
