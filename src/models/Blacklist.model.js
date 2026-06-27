const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    tokens : {
        type : String,
        unique : true
    }
}, {
    timestamps : true
})

const Blacklist = mongoose.model('Blacklist', blacklistSchema);


module.exports = Blacklist;