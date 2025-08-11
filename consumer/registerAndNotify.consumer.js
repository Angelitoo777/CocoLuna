import { ConnectRabbitMQ } from '../services/rabbitmq.services.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const queue = 'bienvenida_user'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL
  }
})

async function startConsumer () {
  try {
    const channel = await ConnectRabbitMQ()

    await channel.assertQueue(queue)

    channel.consume(queue, async (msg) => {
      const userData = JSON.parse(msg.content.toString())
      console.log(`[Consumer] Mensaje recibido para: ${userData.email}`)

      const emailSender = {
        from: process.env.USER_EMAIL,
        to: userData.email,
        subject: `🎉 ¡Bienvenido a CoCoLuna, ${userData.username}!`,
        html: `
    <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
      
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #ff6f61; font-size: 32px; font-weight: bold; margin-bottom: 10px;">¡Hola, ${userData.username}!</h1>
        <p style="color: #555; font-size: 18px; line-height: 1.6;">
          ¡Qué emoción tenerte en la familia de CoCoLuna!
        </p>
      </div>

      <div style="background-color: #fce4ec; padding: 30px; border-radius: 10px; text-align: center;">
        <h2 style="color: #d81b60; font-size: 24px; font-weight: bold; margin-bottom: 15px;">Tu Estilo, Tu Brillo Propio ✨</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.8;">
          Hemos preparado una colección que celebra tu belleza única. Desde los básicos que amas hasta las piezas de tendencia que te harán destacar. ¡Tu nuevo look te está esperando!
        </p>
        <a 
          href="http://localhost:3000/auth/login" 
          style="display: inline-block; margin-top: 30px; padding: 14px 30px; background-color: #ff6f61; color: #fff; text-decoration: none; font-weight: bold; border-radius: 30px; font-size: 16px; letter-spacing: 1px; box-shadow: 0 4px 6px rgba(255,111,97,0.3);"
        >
          ¡Comienza a comprar! 🛍️
        </a>
      </div>

      <div style="text-align: center; margin-top: 25px; color: #888; font-size: 13px; line-height: 1.5;">
        <p>¿Tienes preguntas? Responde a este correo, ¡estamos aquí para ayudarte!</p>
        <p>Con cariño,<br>El equipo de CoCoLuna</p>
        <p style="margin-top: 10px;">&copy; 2024 CoCoLuna. Todos los derechos reservados.</p>
      </div>

    </div>
  `
      }

      try {
        await transporter.sendMail(emailSender)
        console.log(`[Consumer] Correo enviado exitosamente a ${userData.email}.`)

        channel.ack(msg)
      } catch (error) {
        console.error(`[Consumer] Error al enviar el correo a ${userData.email}:`, error)
        channel.nack(msg)
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

startConsumer()
