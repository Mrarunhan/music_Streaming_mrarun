const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,

    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "artist", 'admin'],
        default: "user"
    },

    profileImage: {
        type : String,
        default : null
    },

    createdAt: Date,
    updatedAt: Date
})

const artistInFoSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        unique : true
    },
    bio : {
        type : String,
        default : null
    },
    poster : {
        type : String,
        default : null
    },
    verified : {
        type : Boolean,
        required : true,
        default : false
    }
}, {timestamps : true})

const Artist = mongoose.model('Artist', artistInFoSchema)
const User = mongoose.model('User', UserSchema);

module.exports = {
     User,
     Artist
}