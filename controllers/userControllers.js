const User = require('../models/User')

exports.login = function login (req, res){
 let user = new User(req.body)
  user.login().then(function(result){
    req.session.user = { username:user.data.username}
    req.session.save(function(){
    res.redirect('/')

    })

  }).catch(function(error){

    res.send(error)
  })
 
}
exports.logout = function logout (req,res){
   req.session.destroy();
  
   res.redirect('/')
}
exports.signUp= function signUp (req ,res){

 let user = new User(req.body)
 user.signUp();

 if(user.errors.length){
    res.send(user.errors);
  }
  else{
    res.send('Thanks for your sbmuit');

  }
}
exports.home = function home(req ,res){
if(req.session.user){
  res.render('home-dashboard')
}else{
  res.render('home-guest')
}
}