const express = require('express')
const router = express.Router()
const carrito = require('../api/carrito')
const Ethereal = require('../mensajeria/emailEthereal')
const SMS = require('../mensajeria/sms')

router.get('/listar', async (req, res) => {
    let resultado = await carrito.listar()
    res.json(resultado)
})

router.get('/listar/:id', async (req, res) => {
    let idCarrito = req.params.id
    let resultado = await carrito.listarPorId(idCarrito)
    res.json(resultado)
})

router.post('/guardar/:id_producto', async (req, res) => { 
    let idProducto = req.params.id_producto
    let resultado = await carrito.guardar(idProducto)
    res.json(resultado)
})

router.put('/actualizar/:id', async (req, res) => {
    let idCarrito = req.params.id
    let nuevoProducto = req.body
    let resultado = await carrito.actualizar(idCarrito, nuevoProducto)
    res.json(resultado)
})

router.delete('/borrar/:id', async (req, res) => {
    let idProducto = req.params.id
    let resultado = await carrito.borrar(idProducto)
    res.json(resultado)
})

router.get('/comprar', async (req, res) => {
    let contenidoCarrito = carrito.listar()
    // SMS.enviarSMSCompra(req.user.telefono)
    // SMS.enviarWhatsappAdmin(req.user.telefono)
    Ethereal.enviarMailOrdenCompra(contenidoCarrito, req.user.nombre, req.user.email)
})

module.exports = router