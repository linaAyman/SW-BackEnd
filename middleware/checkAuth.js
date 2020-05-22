

/**
*@module middleware
*/

const jwt  = require('jsonwebtoken')
const User = require('../models/User')

/**
* chechAuth  check if token valid 
*@function chechAuth
*@memberof module:middleware
*@param {object}  req                              Express request object
*@param {string}  req.headers.authorization        search by user ID  which is in the token
*@param {object}  res 
*@param {status}  res.status       if error  it returns status of 401/ if success it returns status of 200 
*@param {string}  res.message      if error Auth failed 
 */



const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        const user  = await User.findOne({ _id:decoded._id});
        if(!user){
            throw new Error()
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({error:'Auth failed!'})
    }
}

// async function  getobjectID (req){
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.decode(token);
//     return decoded._id;
// }

module.exports = auth
// module.exports=getobjectID