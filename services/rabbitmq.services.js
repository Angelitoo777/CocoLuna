import amqp from 'amqplib'
import dotenv from 'dotenv'

dotenv.config()

export const ConnectRabbitMQ = async () => {
  try {
    const url = process.env.RABBIT_URL

    const connection = await amqp.connect(url)
    const channel = await connection.createChannel()

    console.log('RabbitMQ is connected')

    return channel
  } catch (error) {
    throw new Error(error)
  }
}

export const publishMessage = async (queue, message) => {
  try {
    const channel = await ConnectRabbitMQ()

    await channel.assertQueue(queue)

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

    console.log(`[x] Mensaje enviado a la cola "${queue}":`, message)
  } catch (error) {
    throw new Error(error)
  }
}
