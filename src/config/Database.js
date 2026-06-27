const mongoose = require("mongoose");




const DB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("db is connect");
    } catch (error) {
        console.log(error)
    }
}

module.exports = DB