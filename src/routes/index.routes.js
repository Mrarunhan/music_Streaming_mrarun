const express = require('express');

const route = express.Router()


const UserRoutes = require("./User.routes");

route.use('/auth', UserRoutes)

module.exports = route;