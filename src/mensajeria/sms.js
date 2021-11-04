const dotenv = require('dotenv')
dotenv.config()

let accountSid = process.env.SMS_SID || 'ACee4b3a7272396e74ad07bbf6d8317aa2'
let authToken = process.env.SMS_TOKEN || '0466654b4a06c0194df8659257abd949'

const client = require('twilio')(accountSid, authToken)

class SMS {
    constructor() {

    }

    enviarSMS(usuario, texto, telefono) {
        client.messages.create({
            body: `${usuario} mencionó a un administrador en el siguiente mensaje: ${texto}`,
            from: '+12673968346',
            to: `${telefono}`
        })
            .then(message => console.log(message.sid))
            .catch(console.log('No se pundo enviar el SMS'))
    }

    enviarSMSCompra(telefono) {
        client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: '+12673968346',
            to: `${telefono}`
        })
            .then(message => console.log(message.sid))
            .catch(console.log('No se pundo enviar el SMS de compra'))
    }

    enviarWhatsappAdmin(datos) {
        client.messages.create({
            body: `Datos compra cliente: ${datos}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.NUMERO_WHATSAPP}`
        })
            .then(message => console.log(message.sid))
            .catch(console.log('No se pundo enviar el mensaje por Whatsapp'))
    }
}

module.exports = new SMS();