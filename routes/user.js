const { Router } = require('express')
const router = Router()
const key = process.env.KEY;
const jwt = require('jsonwebtoken')
const { User, Courses } = require("../db")
const  userMiddleware  = require("../middleware/user");
const { route } = require('./admin');

router.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username: username,
        password: password
    })
        .then(function (solve) {
            res.status(200).json({
                msg: "User created successfully!..."
            })
        })

});

router.post('/signin', async function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne(
        {
            username,
            password
        }
    )

    if(user){

        const token = jwt.sign({username}, key);

        res.json({
            token: token
        })
    }
    else {
        res.json({
            msg: "Invalid Credentials..."
        })
    }
})

router.get('/courses', async function (re, res) {
    const response = await Courses.find({});
    res.json({
        courses: response
    })
})

router.post('/courses/:courseId', userMiddleware, async function (req, res) {
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne(
        { username: username },
        { "$push": { purchasedCourse: courseId } }
    )

    res.json({
        msg: "Purchase complete!..."
    })
});

router.get('/purchasedCourses', userMiddleware, async function (req, res) {
    const username = req.headers.username;
 
    const user = await User.findOne(
        {
             username
        }
    )

    const course = await Courses.find(
        {
            _id: {
                "$in": user.purchasedCourse
            }
        }
    )

    res.json({
        course: course
    })

})

module.exports = router