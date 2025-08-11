import { publishMessage } from './rabbitmq.services.js'
import { User } from '../models/user.model.js'

export const registerAndNotify = async (userData) => {
  const newUser = await User.create(userData)
  console.log('Usuario creado en la base de datos')

  const queueName = 'bienvenida_user'
  const message = {
    email: newUser.email,
    username: newUser.username
  }

  await publishMessage(queueName, message)

  return newUser
}
