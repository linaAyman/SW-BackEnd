const mongoose = require('mongoose');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../models/User');
const config = require('../facebookAuth');
var random = require('random-key');
const moment = require('moment');

function convertType(gender) {
  if (gender == "female") {
    return true;
  } else {
    return false;
  }
};
function convertDate(date) {
  var birthDate = new Date(date);
  return birthDate;
};

module.exports = function () {

  passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'emails', 'gender', 'birthday']
  }, function (accessToken, refreshToken, profile, done) {
    var date = convertDate(profile._json.birthday);
    var userGender = convertType(profile.gender);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: profile.displayName,
      email: profile.emails[0].value,
      birthDate: date,
      gender: userGender,
      facebook: {
        token: accessToken,
        id: profile.id
      }
    });
    user.uri = 'Maestro:User:' + user._id.toString();
    user.href = 'https://api.Maestro.com/v1/users/' + user._id.toString();
    user.externalUrls.value = 'https://open.Maestro.com/users/' + user._id.toString();
    user.maestroId = random.generate(30);
    /* save if new */
    User.findOne({ email: user.email }, function (err, result) {
      if (!result) {

        user.save(function (err, me) {
          if (err) return done(err);
          done(null, user);
        });
      } else {
        done(null, result);
      }
    });
  }
  ));
};

