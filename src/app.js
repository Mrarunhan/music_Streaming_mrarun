const express = require("express");
const app = express()

const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const cors = require("cors")


app.use(express.json())
app.use(helmet())
app.use(morgan('combined'))
app.use(cookieParser())
app.use(cors({origin : "*"}))

const errorMiddlewere = require('./middleware/Error.middleware')
const route = require('./routes/index.routes')



app.use('/api/v1',route)


app.use(errorMiddlewere)


module.exports = app;