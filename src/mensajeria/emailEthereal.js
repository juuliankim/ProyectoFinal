const dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer')

class Ethereal {

    constructor() { }

    enviarMailOrdenCompra(productos, nombre, email) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        let mailOptions = {
            from: 'Servidor NodeJS',
            to: process.env.GMAIL_DESTINO,
            subject: `Nuevo pedido de ${nombre} (${email})`,
            html: `<div>Productos pedidos: ${productos}</div>  <div>Pedido a la fecha: ${new Date().toLocaleString()}</div>`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(info)
        })

    }

    mailAdminRegistro(nuevoUsuario) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        let mailOptions = {
            from: 'Servidor NodeJS',
            to: process.env.GMAIL_DESTINO,
            subject: 'Nuevo registro',
            html: `<h3>Datos nuevo usuario: <span>${JSON.stringify(nuevoUsuario)}</span></h3>`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(info)
        })
    }

    enviarMailLogIn(email, usuario, foto) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        });

        let mailOptions = {
            from: 'Servidor NodeJS',
            to: email,
            subject: 'Se hizo login',
            html: `Se detectó que el usuario ${usuario} hizo un login en la fecha: ` + new Date().toLocaleString(),
            attachments: [
                {
                    path: `${foto}`
                }
            ]
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(info)
        })
    }
    enviarMailLogOut(email, usuario) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        });

        let mailOptions = {
            from: 'Servidor NodeJS',
            to: email,
            subject: 'Se hizo login',
            html: `Se detectó que el usuario ${usuario} hizo un logout en la fecha: ` + new Date().toLocaleString(),
            attachments: [
                {
                    path: `${foto}`
                }
            ]
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(info)
        })
    }

    enviarMailErrores(error) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        let mailOptions = {
            from: 'Servidor NodeJS',
            to: process.env.GMAIL_DESTINO,
            subject: 'Error en el servidor NodeJS',
            html: `Se detectó un error en el server. <span>Error:<strong> ${error}</strong></span>`,
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(info)
        })
    }
}

module.exports = new Ethereal();