
const jwt  = require('jsonwebtoken')
const User = require('../models/User')

function  getobjectID (req){
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
    console.log(decoded._id)
    return decoded._id;
}

module.exports=getobjectID