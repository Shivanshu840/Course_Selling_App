const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const Adminschema = new mongoose.Schema({
    username: String,
    password: String

})

const Userschema = new mongoose.Schema({
    username:String,
    password: String,

    purchasedCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    }]
})

const courseschema = new mongoose.Schema({
    title:String,
    description: String,
    price:Number,
    imageLink: String
})

const Admin = mongoose.model('Admin', Adminschema)
const User = mongoose.model('User', Userschema)
const Courses = mongoose.model('Courses', courseschema)

module.exports = {
    Admin,
    User,
    Courses
}


