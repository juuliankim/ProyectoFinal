const carrito = require('../models/carrito')
const Productos = require('./productos')

class Carrito {

    constructor() { }

    async listar() {
        try {
            let cart = await carrito.find({});
            return cart
        } catch (error) {
            throw new Error('Error: no se encuentran los carritos')
        }
    }
    async listarPorId(idCarrito) {
        try {
            let cart = await carrito.find({ _id: idCarrito });
            return cart
        } catch (error) {
            throw new Error('Error: no se encuentran el carrito solicitado')
        }
    }

    async guardar(idProducto) {
        try {
            let cart = {
                timestamp: 'fecha',
                productos: {}
            }
            let timestamp = new Date().toLocaleString()
            let producto = await Productos.listarPorId({_id: idProducto})
            cart.timestamp = timestamp
            cart.productos = producto
            await carrito.create(cart)
            return cart
        } catch (error) {
            throw new Error('Error: no se guardo correctamente el carrito')
        }
    }

    async actualizar(idCarrito, nuevoProducto) {
        try {
            let nuevoCarrito = await carrito.find({ _id: idCarrito });
            nuevoCarrito.productos = nuevoProducto
            let cart = await carrito.findByIdAndUpdate({ _id: idCarrito }, nuevoCarrito);
            return cart
        } catch (error) {
            throw new Error('Error: no se actualizo correctamente el carrito')
        }
    }

    async borrar(idCarrito) {
        try {
            let cart = await carrito.findByIdAndDelete({ _id: idCarrito })
            return cart
        } catch (error) {
            throw new Error('Error: no se borro correctamente el carrito')
        }
    }

    async comprar() {
        try {
            let contenidoCarrito = await Carrito.listar()
            Ethereal.enviarMailOrdenCompra(contenidoCarrito, req.user.nombre, req.user.email)
            res.send('ORDEN CONCRETADA')
        } catch(error) {
            console.log('Error: no se pudo realizar la compra')
        }
    }

}

module.exports = new Carrito()