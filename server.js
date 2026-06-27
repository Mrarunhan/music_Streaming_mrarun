require('dotenv').config();

const app = require("./src/app");
const DB = require("./src/config/Database")

const port = process.env.PORT || 8080


DB()

app.listen(port , () => {
    console.log(`this server is runing here http://localhost:${port}`)
})