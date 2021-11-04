const productos = require('../models/producto')

class Productos {

    constructor() { }

    async listar() {
        try {
            let producto = await productos.find({}).lean()
            return producto
        } catch (error) {
            throw new Error('Error: no se encuentran los productos')
        }
    }

    async listarPorId(idProducto) {
        try {
            let producto = await productos.find({ _id: idProducto })
            return producto
        } catch (error) {
            throw new Error('Error: no se encuentran el producto solicitado')
        }
    }

    async guardar(nuevoProducto) {
        try {
            let timestamp = new Date().toLocaleString()
            nuevoProducto.timestamp = timestamp
            let producto = await productos.create(nuevoProducto)
            return producto
        } catch (error) {
            throw new Error('Error: no se pudo guardar el producto')
        }
    }

    async actualizar(idProducto, nuevoProducto) {
        try {
            let producto = await productos.findByIdAndUpdate({ _id: idProducto }, nuevoProducto)
            return producto
        } catch (error) {
            throw new Error('Error: no se pudo actualizar el producto')
        }
    }

    async borrar(idProducto) {
        try {
            let producto = await productos.findByIdAndDelete({ _id: idProducto })
            return producto
        } catch (error) {
            throw new Error('Error: no se pudo borrar correctamente el producto')
        }
    }
}

module.exports = new Productos()