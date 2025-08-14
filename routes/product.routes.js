import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

export const routesOfProducts = Router()

routesOfProducts.get('/products', ProductController.getProducts)
routesOfProducts.get('/products/search', ProductController.searchProduct)
routesOfProducts.get('/products/:_id', ProductController.getProductById)

routesOfProducts.post('/products', authMiddleware, isAdmin, ProductController.createProduct)
routesOfProducts.post('/products/buy', authMiddleware, ProductController.buyProduct)

routesOfProducts.patch('/products/:_id', authMiddleware, isAdmin, ProductController.updateProduct)
routesOfProducts.delete('/products/:_id', authMiddleware, isAdmin, ProductController.deleteProduct)
