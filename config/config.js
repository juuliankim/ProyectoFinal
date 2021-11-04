const dotenv = require('dotenv')
dotenv.config()
const path = require('path')

console.log(path.resolve(process.cwd(), process.env.NODE_ENV + '.env'))

dotenv.config({
    path: path.resolve(_dirname, process.env.NODE_ENV + '.env')
})

module.exports = {
  PORT: process.env.PORT || '8080',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_DB: process.env.MONGO_DB || "mongodb://localhost:27017/ecommercedb",
  SECRET: process.env.SECRET || 'secreto',
  JWT_SECRET: process.env.JWT_SECRET || 'JWT-secret',
  GMAIL_USER: process.env.GMAIL_USER || 'dthmax2@gmail.com'
}