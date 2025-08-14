import { connectMongoDB } from '../db/mongo.db.js'
import { clientRedis } from '../db/redis.db.js'
import { publishTopicMessage } from './rabbitmq.services.js'
import { Product, Order } from '../models/products.model.js'
import mongoose from 'mongoose'

await connectMongoDB()

export const createPurchase = async (items, userEmail) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    let totalPurchasePrice = 0

    const productsInOrder = await Promise.all(items.map(async item => {
      const product = await Product.findByIdAndUpdate(item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true, session, lean: false }
      )

      if (!product || product.stock < 0) {
        throw new Error(`Stock insuficiente para el producto: ${item.productId}`)
      }

      totalPurchasePrice += product.price * item.quantity

      await clientRedis.del('products')

      return { product, quantity: item.quantity }
    }))

    const order = new Order({
      userEmail,
      total: totalPurchasePrice,
      purchaseDate: new Date(),
      items: productsInOrder.map(item => ({
        productId: item.product._id,
        productName: item.product.productName,
        quantity: item.quantity,
        price: item.product.price
      }))
    })

    await order.save({ session })

    const exchangeName = 'store_events'
    const routingKey = 'shop.new_order'

    const message = {
      transactionId: order._id,
      userEmail,
      items: order.items,
      total: totalPurchasePrice,
      purchaseDate: order.purchaseDate
    }

    await publishTopicMessage(exchangeName, routingKey, message)

    await session.commitTransaction()
    console.log('Transaccion en base de datos y mensaje publicado')

    return message
  } catch (error) {
    await session.abortTransaction()
    console.error('Error en la transaccion', error.message)

    throw error
  } finally {
    await session.endSession()
  }
}
