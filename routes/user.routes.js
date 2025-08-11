import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { UserController } from '../controllers/user.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

export const routesOfUser = Router()

routesOfUser.get('/users', authMiddleware, isAdmin, UserController.getUsers)

routesOfUser.post('/register', UserController.registerUser)
routesOfUser.post('/login', UserController.loginUser)
