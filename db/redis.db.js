import redis from 'redis'

export const clientRedis = redis.createClient({
  host: process.env.HOST_REDIS,
  port: process.env.PORT_REDIS
})

export const connectRedis = async () => {
  try {
    await clientRedis.connect()
    console.log('Redis is connected')
  } catch (error) {
    console.error('Error al conectar con Redis:', error)
  }
}
