const jwt = require('jsonwebtoken')
const key = process.env.KEY;

function userMiddleware(req,res,next){
 const token = req.headers.authorization;
 const word = token.split(" ");

 const jwttoken = word[1];
 const decodeValue = jwt.verify(jwttoken, key);
 const username = decodeValue.username;

 try{

    if(username){
        next();
    }
    else{
        res.json({
            msg: "You're not authenticated"
        })
    }
 }catch(err){
    res.json({
        msg: "Invalid Input "
    })
 }
 

}
module.exports = userMiddleware