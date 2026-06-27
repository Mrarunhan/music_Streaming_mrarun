const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    genre: String,

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    thumbnail: String,

    audio: String,

    duration: Number,

    totalPlay: {
        type: Number,
        default: 0
    },

    totalLikes: {
        type: Number,
        default: 0
    },

    createdAt: Date
})



const LikeSchema = new mongoose.Schema({
    likes : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    musicId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Song',
        required: true
    }
})

LikeSchema.index(
    {likes : 1, musicId : 1},
    {unique : true}
)


const PlaySchema =new mongoose.Schema({
    Plays : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    musicId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Song'
    }
})


const Plays = mongoose.model('Plays', PlaySchema)
const Like = mongoose.model('Like', LikeSchema)
const Song = mongoose.model('Song', songSchema);

module.exports = {
    Plays,
    Like,
    Song
}