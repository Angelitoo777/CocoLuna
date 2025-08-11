import { User } from '../models/user.model.js'
import { validationUser, validateParcialUser } from '../validations/user.validation.js'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { registerAndNotify } from '../services/registenAndNotify.services.js'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET_KEY

export class UserController {
  static async registerUser (req, res) {
    const validate = validationUser(req.body)

    if (!validate.success) {
      return res.status(400).json({ message: 'Error de validacion' })
    }

    const { email, username, password, role } = validate.data

    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }]
        }
      })

      if (existingUser) {
        return res.json('Email o username ya registrado')
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const newUser = await registerAndNotify({ email, username, password: passwordHash, role })

      return res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        message: 'Te has registrado exitosamente, en breve te llegara un correo electronico de bienvenida'
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  static async loginUser (req, res) {
    const validate = validateParcialUser(req.body)

    if (!validate) {
      return res.status(400).json({ message: 'Error de validacion' })
    }

    const { username, password } = validate.data

    try {
      const user = await User.findOne({ where: { username } })

      if (!username) {
        return res.json('Credenciales incorrectas')
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.json('Credenciales incorrectas')
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }, JWT_SECRET, { expiresIn: '1h' })

      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600000 // 1 hr
        })
        .status(200)
        .json({
          message: 'Te has logueado exitosamente'
        })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async getUsers (req, res) {
    try {
      const findUsers = await User.findAll()

      return res.json(findUsers)
    } catch (error) {
      throw new Error(error)
    }
  }
}
