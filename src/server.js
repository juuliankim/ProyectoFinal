const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//const Ethereal = require('./mensajeria/emailEthereal')

require('./database/connection')

app.use(express.static('public'))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET || 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts'
}))

app.set("view engine", "hbs")
app.set("views", "./views")

const productosRouter = require('./routes/productos')
const carritoRouter = require('./routes/carrito')
const usuarioRouter = require('./routes/usuarios')

app.use('/productos', productosRouter)
app.use('/carrito', carritoRouter)
app.use('/users', usuarioRouter)

app.get('/', async (req, res) => {
    if(isAuthenticated()){
        res.redirect('/users')
    }
})

let PORT = process.env.PORT || 8081

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})

server.on('error', error => {
    //Ethereal.enviarMailErrores(error)
    console.log('error en el servidor:', error);
})
