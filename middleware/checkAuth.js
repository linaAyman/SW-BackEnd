const jwt  = require('jsonwebtoken')
const User = require('../models/User')

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

module.exports = auth