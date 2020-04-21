const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('dotenv').config();


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
        //res.setHeader('Content-Type','application/json');
       
    }
};
