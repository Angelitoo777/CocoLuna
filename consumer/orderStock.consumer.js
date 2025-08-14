import { ConnectRabbitMQ } from '../services/rabbitmq.services.js'
import dotenv from 'dotenv'

dotenv.config()

const exchange = 'store_events'
const bindingKey = 'shop.new_order'

const startConsumer = async () => {
  const channel = await ConnectRabbitMQ()

  await channel.assertExchange(exchange, 'topic')
  const q = await channel.assertQueue('updateStock')

  await channel.bindQueue(q.queue, exchange, bindingKey)

  channel.consume(q.queue, async (msg) => {
    const purchaseData = JSON.parse(msg.content.toString())
    for (const item of purchaseData.items) { console.log(`[Consumer Stock] Actualizando stock para el producto ${item.productId} de la compra #${purchaseData.transactionId}.`) }

    try {
      channel.ack(msg)
    } catch (error) {
      console.error('[Consumer Stock] Error fatal:', error)
      channel.nack(msg)
    }
  })
}

startConsumer()
