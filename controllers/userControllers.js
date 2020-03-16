const User = require('../models/User')

exports.login = function login (req, res){
   let user = new User(req.body)
   user.login().then(function(result){
    req.session.user = { username:user.data.username}
    req.session.save(function(){
    res.redirect('/')

    })

  }).catch(function(error){
    req.flash('errors', error)
    req.session.save(function(){
      res.redirect('/')
    })
   
  })
 
}
exports.logout = function logout (req,res){
   req.session.destroy();
  
   res.redirect('/')
}
exports.register= function register(req , res){

 let user = new User(req.body)
 user.register().then(() =>{
  req.session.user = {username : user.data.username }
  req.session.save(function(){
    res.redirect('/')
  })
 }).catch( ( regErrors) => {
    regErrors.forEach(function(error){
    req.flash('regErrors', error)
    })
    req.session.save(function(){
    res.redirect('/')

     })



 })

}

exports.home = function home(req ,res){
if(req.session.user){
  res.render('home-dashboard',{username: req.session.user.username})
}else{
  res.render('home-guest',{errors: req.flash('errors') , regErrors: req.flash('regErrors')})
}
}