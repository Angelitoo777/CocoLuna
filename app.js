import express from 'express'
import { routesOfUser } from './routes/user.routes.js'
import { sequelize } from './db/mysql.db.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cookieParser())

app.use('/auth', routesOfUser)

try {
  await sequelize.sync({ force: true })
} catch (error) {
  throw new Error(error)
}

app.get('/', (req, res) => {
  res.send('Hola cocoluna')
})

app.listen(PORT, () => {
  console.log('Your server is running')
})
