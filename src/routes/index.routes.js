const express = require('express');

const route = express.Router()


const UserRoutes = require("./User.routes");
const ArtistRouter = require('./Artist.routes');
const MusicRouter = require("./Music.routes")

route.use('/auth', UserRoutes);
route.use("/artist", ArtistRouter);
route.use("/music" , MusicRouter)

module.exports = route;