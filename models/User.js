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
  User.prototype.validate = function (){
    if (this.data.username === "" ){
     this.errors.push("you must provide username");
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
        this.errors.push("you must provide password at least 8 ");
       }
     if (this.data.password.length > 50){characters
        this.errors.push("you must provide password cannot exceed 50 characters");
       }
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
   
  User.prototype.signUp= function(){
  // step1 user data not empty and make sense
   this.cleanUp();
   this.validate();
   //if no error then save to database 
    if(!this.errors.length){
      //if thers isnot any errors nbd2 nesagl 
      //hash user password
      let salt = bcrypt.genSaltSync(10);
      this.data.password = bcrypt.hashSync(this.data.password ,salt)
      UsersCollection.insertOne(this.data)
     }
  }
  module.exports = User;