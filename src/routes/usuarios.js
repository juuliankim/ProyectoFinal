const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const express = require('express')
const router = express.Router()
require('../api/usuarios')
const bcrypt = require('bcrypt')
const passport = require('passport')
const Ethereal = require('../mensajeria/emailEthereal')
const productos = require('../api/productos')
const carrito = require('../api/carrito')
const User = require('../models/usuario')
const auth = require('../authenticate/auth')

router.get('/', auth.checkeoAutenticidad, async (req, res) => {
    if (req.isAuthenticated()) {
        var user = req.user
        let usuario = await User.findOne({ 'email': user.data.username })
        let listaProductos = await productos.listar()
        let vistaCarrito = await carrito.listar()
        res.render('vista', { showLogin: false, showContent: true, bienvenida: usuario.nombre, listaProductos: listaProductos, vistaCarrito: vistaCarrito, showBienvenida: true })
    } else {
        res.redirect('/login')
    }
})
 
router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/users')
    } else {
        res.render('register', {})
    }
})

router.post('/register', passport.authenticate('signup', { failureRedirect: '/users/failsignup' }), async (req, res) => {
    let usuario = req.body
    usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null)
    let token = auth.generadorToken(usuario)
    usuario.token = token
    Ethereal.mailAdminRegistro(usuario)
    res.cookie("token", token).redirect('/users')
})

router.get('/failsignup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/failSignup.html'))
})

router.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/users')
    }
    else {
        res.render('vista', { showLogin: true, showContent: false, showBienvenida: false })
    }
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/users/faillogin' }), async (req, res) => {
    let usuario = req.body
    usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null)
    let token = auth.generadorToken(usuario)
    usuario.token = token
    res.cookie("token", token).redirect('/users')
})

router.get('/faillogin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/failLogin.html'))
})

router.get('/logout', (req, res) => {
    req.logout()
    res.clearCookie('token').sendFile(path.join(__dirname, '../public/logout.html'))
})

module.exports = router