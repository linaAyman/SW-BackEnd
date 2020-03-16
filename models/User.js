const UsersCollection = require('../db').db().collection('Users');
const validator = require('validator');//this used for the regular expression 
const bcrypt = require('bcryptjs');//this used for hashing the passwords to provide more secuirty

let User = function (data){
   this.data= data;
   this.errors = [];
}
 
   User.prototype.cleanUp = function (){
    if(typeof(this.data.username) != "string" ){
        this.data.username = "";
    }  
    if(typeof(this.data.email) != "string" ){
        this.data.email= "";
    }  
    if(typeof(this.data.password) != "string" ){
        this.data.password = "";
    }  
     this.data = {
        username: this.data.username.trim().toLowerCase() ,
        email:  this.data.email.trim().toLowerCase() ,
        password: this.data.password  
     }
  }
  //we use asyn to make await works prefectly to wait the data come form mongodb
  User.prototype.validate = function(){

return new Promise(async (resolve , reject) => {
   if (this.data.username === "" ){
   this.errors.push("you must provide username");
   }
   if (this.data.username.length > 0 && this.data.username.length <3 ){
    this.errors.push("you must provide username much longer");
    }
   if (this.data.username.legth > 30  ){
       this.errors.push("you must provide username not exceed 30 characters");
       }
   if (this.data.username !== "" && !validator.isAlphanumeric(this.data.username )){
      this.errors.push("you must provide username");
      }
   if (!validator.isEmail(this.data.email)){
    this.errors.push("you must provide email");
   }
   if (this.data.password === ""){
    this.errors.push("you must provide password");
   }
   if (this.data.password.length >0 && this.data.password.length <8 ){
      this.errors.push("you must provide password at least 8 characters ");
     }
   if (this.data.password.length > 50){
      this.errors.push("you must provide password cannot exceed 50 characters");
     }
     //only if username is valid first then check to see if its already taken 
 if(validator.isEmail(this.data.email) ){
   let emailExists =await UsersCollection.findOne({uemail:this.data.email})
   if(emailExists){this.errors.push("that username is already taken")}

  }
  //only if mail is valid first then check to see if its already taken 
  if(this.data.username.length> 2 && this.data.username.length  < 31 && validator.isAlphanumeric(this.data.username ) ){
    let userNameExists =await UsersCollection.findOne({username:this.data.username})
    if(userNameExists){this.errors.push("that email is already taken")}

   }
   resolve()
})



  }
    
  User.prototype.login = function(){
    return new Promise( (resolve ,reject)=> {
    this.cleanUp();
    UsersCollection.findOne({username:this.data.username}).then((attemptedUser) => {
    if(attemptedUser && bcrypt.compareSync(this.data.password ,attemptedUser.password) ){
       resolve('Tmam')
    }
    else{
       reject('Invalid')
    }
    }).catch(() => {

       reject('try again')
       })
    })
   }
   
  User.prototype.register= function (){
  return new Promise(async (resolve ,reject) => {
   // step1 user data not empty and make sense
    this.cleanUp();
   await this.validate();
    //if no error then save to database 
          if(!this.errors.length){
             //if thers isnot any errors nbd2 nesagl 
             //hash user password
             let salt = bcrypt.genSaltSync(10);
             this.data.password = bcrypt.hashSync(this.data.password ,salt)
            await UsersCollection.insertOne(this.data)
             resolve()
            }
         else{

              reject(this.errors)
         }
     
   })

  }

  module.exports = User;