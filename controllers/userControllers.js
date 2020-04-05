const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//this used for hashing the passwords to provide more secuirty
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const User = require('../models/User')
const env = require('dotenv').config();
const fs = require('fs');
const imgPath = './public/profileImage/default.jpg';
const nodemailer = require("nodemailer");
const RandHash =require('../models/RandHash');// put randam hash in url in verify mail
var randomHash = require('random-key');
var mailOptions;
const rand =new RandHash;
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

function validatePassword (req) {

	const schema = {
    newPassword: Joi.string().min(8).max(80).alphanum().required(),
    confirmedPassword: Joi.string().min(8).max(80).alphanum().required()
	}
	return Joi.validate(req, schema);
}
function changePassword (req) {

	const schema = {
    oldPassword:Joi.string().min(8).max(80).alphanum().required(),
    newPassword: Joi.string().min(8).max(80).alphanum().required(),
    confirmedPassword: Joi.string().min(8).max(80).alphanum().required()
	}
	return Joi.validate(req, schema);
}

function randGenerator(){
  rand.randNo = randomHash.generate(50);
}

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
   port: 8000,
   secure: false,
   auth: {
      user: process.env.MAESTROEMAIL,//change 
      pass: process.env.PASSWORD
  }
 
});



  exports.userSignup =   (req, res, next) => {
   const { error } = joiValidate(req.body)
   if (error)
    return res.status(400).send({ msg: error.details[0].message });
   User
     .find({ name: req.body.name  })
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
                randGenerator();
               const host = req.get('host');//just our locahost
               const link="http://"+host+"/user/verify?id="+rand.randNo;
               mailOptions={
                    from: 'Do Not Reply '+process.env.MAESTROEMAIL,
                    to : req.body.email,//put user email
                    subject : "Please confirm your Email account",
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                }
               console.log(mailOptions);
               smtpTransport.sendMail(mailOptions, function(error, response){
               if(error){
                  console.log(error);
                  return res.status(500).send({ msg: 'Unable to send email' });     
                  
               }else{
                      //here that the message send successfulyy so the user can sign up  
                      const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email: req.body.email,
                        password: hash,
                        birthDate:req.body.birthDate,
                        gender:req.body.gender
                      
                      });
                      rand.userId=user._id;//to use it back in verify mail
                      rand.save().then().catch();
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
          }
    
        });     
         
   
};

exports.userLogin = (req, res, next) => {
  User
    .findOne({ email: req.body.email })
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


exports.userVerifyMail = (req, res, next) => {
  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+req.get('host'))){
     console.log("Domain is matched. Information is from Authentic email");
     RandHash
     .findOne({ randNo: req.query.id  })
     .exec()
     .then(rand=> {
       if (rand.length < 1) {
         return res.status(401).json({
           message: 'The User doesnot Exist'
         });
       }
         console.log("Email is verified");
          User.updateOne({_id:rand.userId},{active: true})
          .exec()
          .then(result =>{
            res.status(200).json({
              message:"Email is been Successfully verified"
            });
            rand.remove({userID: rand.userId });
            
           })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });   
    })
    .catch(err => {
       console.log("Email is not verified");
      res.status(500).json({
        error: err
      });
    });
 } else{
      res.status(401).json({
      message: 'Domain doesnot Match'
      });
    }

};



exports.userDelete = (req, res, next) => {
  User.remove({ _id: req.params.id })
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


exports.userMailExist = function MailExist (req, res, next) {
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


exports.userChangePassword = (req, res, next) => {
  const { error } =  changePassword(req.body)
  if (error)
  return res.status(400).send({ msg: error.details[0].message });
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  console.log(decoded._id);
  User.findOne({ _id: decoded._id})
    .exec()
    .then(user => {
      if (user.length < 1) { 
        return res.status(401).json({
        message: 'user is not exists'
      });
    }
        bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'Enter correct old password'
            });
          }
          if(result){
            if(req.body.newPassword == req.body.confirmedPassword){
              bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: err
                  });
                } 
                else {
                  User
                  .updateOne({_id:decoded._id},{password: hash})
                  .exec()
                  .then(result => {
                    res.status(200).json({
                      message: 'You change password successfly'
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

            }else{
              return res.status(401).json({
                message: 'Please confirm the New password' 
              });
            }

          }
        });
      
    })
     .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.userForgetPassword = (req, res, next) => {   
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token);
  randGenerator();
  rand.userId = decoded._id;
  console.log( rand.userId)
  console.log( rand.randNo)
  rand.save().then().catch();
  const host = req.get('host');
  const link ="http://"+host+"/user/resetPassword?id="+rand.randNo;
   mailOptions={
    from: 'Do Not Reply '+process.env.MAESTROEMAIL,
    to : req.body.email,//put user email
    subject : "Reset your password",
    html : "Hello.<br>No need to worry, you can reset your Maestro password by clicking the link below:<br><a href="+link+">Reset password</a><br1>   Your username is:"+decoded._id+"</br1> </br2>  If you didn't request a password reset, feel free to delete this email and carry on enjoying your music!</br2>"
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
  if(error){
    console.log(error);
    return res.status(500).send({ msg: 'Unable to send Email' });                
  }else{
    return res.status(201).json({message: 'send msg successfuly'});
   }
  });
};


exports.userResetPassword = (req, res, next) => { 
  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+req.get('host'))){
     console.log("Domain is matched. Information is from Authentic email");
     RandHash
     .findOne({ randNo: req.query.id  })
     .exec()
     .then(rand=> {
       if (rand.length < 1) {
         return res.status(401).json({
           message: 'The User doesnot Exist'
         });
       }
        validatePassword (req.body);
        if(req.body.newPassword == req.body.confirmedPassword){
          bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } 
            else {
              User
              .updateOne({_id:rand.userId},{password: hash})
              .exec()
              .then(result => {
                res.status(200).json({
                  message: 'You reset password successfly'
                });
              rand.remove({userID: rand.userId });
              User
               .findOne({_id:rand.userId})
               .exec()
               .then(user => {
                mailOptions={
                  from: 'Do Not Reply '+process.env.MAESTROEMAIL,
                  to : user.email,//put user email
                  subject : "Confirm Reset Password",
                  html : "Hello.<br>You just have changed your password <br>"
                }
                console.log(mailOptions);
                smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                  console.log(error);
                  return res.status(500).send({ msg: 'Unable to send Email' });                
                }
               });
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
        }else{
          return res.status(401).json({
            message: 'Please confirm the New password' 
          });
        }
       })
      .catch(err => {
        console.log("your cannot reset your password");
        res.status(401).json({
            message: 'your cannot reset your password'
          });
      });
    }
    else{
      res.status(401).json({
      message: 'Domain doesnot Match'
      });
    }
};