const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: String, required: true, max: 100 },
    imagen: { type: String, required: true, max: 100 },
    timestamp: { type: Date, required: true}
})

const Productos = mongoose.model('productos', schema)

module.exports = Productos