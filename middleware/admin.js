const key = process.env.KEY;
const jwt = require('jsonwebtoken');


function adminMiddleware(req,res,next){
    const token = req.headers.authorization;
const word = token.split(" ");
const jwttoken = word[1];
const decode = jwt.verify(jwttoken, key);
const username = decode.username

try{
    if(username){
        next();
    }
    else{
        res.json({
            msg: "You are not authenticated..."
        })
    }
}catch(err){
    res.json({
        msg: "Invalid Input...."
    })
}

    
}
module.exports = adminMiddleware