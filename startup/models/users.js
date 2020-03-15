const mongoose =require('mongoose'),
Schema=mongoose.Schema;



//create a schema

const userSchema=({
    name :String
});

//create model using schema
const userModel=mongoose.model('User',userSchema);
//export model
module.exports=userModel;
