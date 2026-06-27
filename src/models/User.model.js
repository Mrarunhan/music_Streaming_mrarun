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

    profileImage: String,

    createdAt: Date,
    updatedAt: Date
})

const User = mongoose.model('User', UserSchema);

module.exports = User;