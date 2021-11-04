const express = require('express')
const router = express.Router()
const productos = require('../api/productos')

router.get('/listar', async (req, res) => {
    let resultado = await productos.listar()
    res.json(resultado)
})

router.get('/listar/:id', async (req, res) => {
    let idProducto = req.params.id
    let resultado = await productos.listarPorId(idProducto)
    res.json(resultado)
})

router.post('/guardar', async (req, res)=>{
    let nuevoProducto = req.body
    let resultado = await productos.guardar(nuevoProducto)
    res.json(resultado)
})

router.put('/actualizar/:id', async (req,res)=>{
    let idProducto = req.params.id
    let productoActualizado = req.body
    let resultado = await productos.actualizar(idProducto, productoActualizado)
    res.json(resultado)
})

router.delete('/borrar/:id', async (req,res)=>{
    let idProducto = req.params.id
    let resultado = await productos.borrar(idProducto)
    res.json(resultado)
})

module.exports = router