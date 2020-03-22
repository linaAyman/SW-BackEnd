const mongoose = require("mongoose");
const config = require('config')
const bcrypt = require("bcryptjs");//this used for hashing the passwords to provide more secuirty
const jwt = require("jsonwebtoken");
const Joi = require('joi')
const User = require('../models/User')
const env = require("dotenv").config();
  exports.userSignup =   (req, res, next) => {

   User.find({ name: req.body.name  })
   .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Username already exists"
        });
      } else{
        User.find({ email: req.body.email })
        .exec()
        .then(user => {
          if (user.length >= 1) {
            return res.status(409).json({
              message: "Mail exists"
            });
          } else {
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
                const token = jwt.sign(
                  { _id: user._id,
                    name: user.name, 
                  },
                  process.env.JWTSECRET, 
                  {
                    expiresIn: "7d"
                  }

                );
              
                user
                  .save()
                  .then(result => {
                    console.log(result);
                    res.status(201).json({
                      message: "User created",
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


      }
    
    });     
         
   
};

exports.userLogin = (req, res, next) => {
  User.findOne({ name: req.body.name })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          
          const token = jwt.sign(
            { _id: user._id,
              name: user.name, 
            },
            process.env.JWTSECRET,
            {
              expiresIn: "7d"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
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

/*exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};*/
