const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    songs: [
        {
            type: ObjectId,
            ref: "Song"
        }
    ],

    isPrivate: {
        type: Boolean,
        default: true
    },

    createdAt: Date
})

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;