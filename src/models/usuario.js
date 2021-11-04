const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, require: true}
})

const Usuario = mongoose.model('users', schema)

module.exports = Usuario