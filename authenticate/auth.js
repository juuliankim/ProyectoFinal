const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.JSON_TOKEN_SECRET || 'my-token-secret'

class Autenticacion {

    constructor(){ }

    generadorToken(user) {
        return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
    }

    checkeoAutenticidad(req, res, next) {
        let token = req.cookies.token
        if (!token) {
            return res.status(403).json({error: "Ingrese un codigo token"})
        } else {
            jwt.verify(token, tokenSecret, (err, value) => {
                if (err) res.status(500).json({error: "Fallo la autenticacion con token"})
                req.user = value
                next()
            })
        }
    }

}

module.exports = new Autenticacion()