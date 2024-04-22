const {Admin, Courses} = require("../db");
const adminMiddleware = require("../middleware/admin");
const key = process.env.KEY;
const { Router} = require('express')
const router = Router();
const jwt = require('jsonwebtoken')


router.post('/signup', async function(req,res){
    const username = req.body.username
    const password = req.body.password

   await  Admin.create({
        username: username,
        password: password
    })
        res.status(200).json({
            msg:" Admin created successfully!..."
        })

})

router.post('/signin', async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne(
        {
             username,
             password
        }
    )

    if(user){
        const token = jwt.sign({username}, key)

        res.json({
            token: token
        })
         
    }
    else{
        res.status(411).json({
            msg: "Invalid credentials..."
        })
    }
})

router.post('/courses',adminMiddleware, async function(req,res){
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink

    const newcourse = await Courses.create({
        title: title,
        description: description,
        price:price,
        imageLink:imageLink
    })

        res.status(200).json({
            msg: "Courses added succesfully!...", courseId:newcourse._id
        })
    
})
router.get('/courses',adminMiddleware, async function(req,res){

    const allcourse = await Courses.find({})

    res.json({
        msg: allcourse
    })

})
module.exports = router

