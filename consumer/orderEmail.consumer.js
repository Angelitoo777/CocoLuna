import { ConnectRabbitMQ } from '../services/rabbitmq.services.js'
import nodemailer from 'nodemailer'

const exchange = 'store_events'
const bindingKey = 'shop.new_order'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'angeloropeza1604@gmail.com',
    pass: 'yuas fshe hihj glfz'
  }
})

const startConsumer = async () => {
  const channel = await ConnectRabbitMQ()

  await channel.assertExchange(exchange, 'topic')
  const q = await channel.assertQueue('sendOrder')

  await channel.bindQueue(q.queue, exchange, bindingKey)

  channel.consume(q.queue, async (msg) => {
    const purchaseData = JSON.parse(msg.content.toString())

    console.log(`[Consumer] Mensaje recibido para: ${purchaseData.userEmail}`)

    const emailSender = {
      from: process.env.USER_EMAIL,
      to: purchaseData.userEmail,
      subject: `¡Tu pedido #${purchaseData.transactionId} de CoCoLuna! ✨`,
      html: `
        <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
      
            <div style="text-align: center; margin-bottom: 25px;">
                <h1 style="color: #ff6f61; font-size: 32px; font-weight: bold; margin-bottom: 10px;">¡Gracias por tu compra!</h1>
                <p style="color: #555; font-size: 18px; line-height: 1.6;">
                    Estamos preparando tu pedido con mucho cariño. 💕
                </p>
            </div>

            <div style="background-color: #fce4ec; padding: 30px; border-radius: 10px;">
                <h2 style="color: #d81b60; font-size: 24px; font-weight: bold; margin-bottom: 15px; text-align: center;">Resumen de tu Pedido</h2>
                
                <p style="color: #666; font-size: 16px; line-height: 1.8;"><strong>ID del Pedido:</strong> #${purchaseData.transactionId}</p>
                <p style="color: #666; font-size: 16px; line-height: 1.8;"><strong>Fecha:</strong> ${new Date(purchaseData.purchaseDate).toLocaleDateString()}</p>
                
                <hr style="border: none; border-top: 1px solid #ffb2b2; margin: 20px 0;">

                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="color: #666; font-size: 16px;">
                    <tbody>
                        ${purchaseData.items.map(item => `
                            <tr style="margin-bottom: 15px;">
                                <td style="padding: 5px 0;">${item.productName}</td>
                                <td style="text-align: right; padding: 5px 0;">x${item.quantity}</td>
                                <td style="text-align: right; padding: 5px 0;">$${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <hr style="border: none; border-top: 1px solid #ffb2b2; margin: 20px 0;">

                <div style="text-align: right; font-size: 18px; font-weight: bold; color: #d81b60;">
                    Total: <span style="font-size: 24px;">$${purchaseData.total.toFixed(2)}</span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 25px; color: #888; font-size: 13px; line-height: 1.5;">
                <p>Recibirás otra notificación cuando tu pedido sea enviado.</p>
                <p>Con cariño,<br>El equipo de CoCoLuna</p>
                <p style="margin-top: 10px;">&copy; 2024 CoCoLuna. Todos los derechos reservados.</p>
            </div>
        </div>
    `
    }

    try {
      await transporter.sendMail(emailSender)
      console.log(`[Consumer] Correo enviado exitosamente a ${purchaseData.userEmail}.`)
      channel.ack(msg)
    } catch (error) {
      console.error(`[Consumer] Error al enviar el correo a ${purchaseData.userEmail}:`, error)
      channel.nack(msg)
    }
  })
}

startConsumer()
