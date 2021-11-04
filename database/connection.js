const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const url = process.env.MONGO_DB || "mongodb://localhost:27017/coderhouse"

const connection = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', url)
})

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err)
})

module.exports = connection