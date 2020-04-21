const express = require('express');
const router = express.Router();
const passport = require('passport');
var passportConfig = require('../config/passport');
const userController = require('../controllers/userFB');

//setup configuration for facebook login
passportConfig();
router.post('/facebook', passport.authenticate('facebookToken', {session: false, scope: ['email',  'public_profile', 'user_location']}), userController.facebookOAuth);

router.post('/facebook/callback', passport.authenticate('facebookToken', { successRedirect: '/', failureRedirect: '/user/login' }));
/* ,
 function(req, res) {
    res.redirect('/account')
});*/

module.exports = router;
