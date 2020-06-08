
const jwt  = require('jsonwebtoken');

function  getobjectID (req){
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    return decoded._id;
}

module.exports=getobjectID