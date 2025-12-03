const express = require('express')
require('dotenv').config()
const cors = require('cors')
const initRoutes = require('./src/routes')
const connectdb = require('./src/config/connectdb')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

initRoutes(app)
connectdb()

const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Server on running the port ${listener.address().port}`)
})