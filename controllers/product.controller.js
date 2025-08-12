import { elasticCLient } from '../db/elastic.db.js'
import { clientRedis } from '../db/redis.db.js'
import Product from '../models/products.model.js'
import { productValidation, productParcialValidation } from '../validations/product.validation.js'

export class ProductController {
  static async getProducts (req, res) {
    try {
      const cacheProducts = await clientRedis.get('products')

      if (cacheProducts) {
        return res.json(JSON.parse(cacheProducts))
      }

      const products = await Product.find()

      await clientRedis.setEx('products', 3600, JSON.stringify(products))

      return res.status(200).json(products)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getProductById (req, res) {
    const { _id } = req.params

    try {
      const cacheById = await clientRedis.get(`products:${_id}`)

      if (cacheById) {
        return res.json(JSON.parse(cacheById))
      }

      const getById = await Product.findById({ _id })

      if (!getById) {
        res.status(404).json({ message: 'Producto no existente' })
      }

      await clientRedis.setEx(`products:${_id}`, 3600, JSON.stringify(getById))

      return res.json(getById)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor', error: error.message })
    }
  }

  static async createProduct (req, res) {
    const validation = productValidation(req.body)

    if (!validation.success) {
      return res.status(400).json({ message: 'Error de validacion', error: validation.errors })
    }

    const { name, description, stock, category, imageUrl } = validation.data

    try {
      const newProduct = new Product({
        name,
        description,
        stock,
        category,
        imageUrl
      })

      await newProduct.save()

      const productDocument = newProduct.toObject()
      delete productDocument._id

      await elasticCLient.index({
        index: 'products',
        id: newProduct._id.toString(),
        document: productDocument
      })

      await clientRedis.del('products')

      return res.status(201).json(newProduct)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor', error: error.message })
    }
  }

  static async updateProduct (req, res) {
    const { _id } = req.params
    const validation = productParcialValidation(req.body)

    if (!validation.success) {
      return res.status(400).json({ message: 'Error de validacion', error: validation.errors })
    }

    const { name, description, stock, category, imageUrl } = validation.data

    try {
      const findProduct = await Product.findById({ _id })

      if (!findProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      const updateProduct = await Product.findByIdAndUpdate(_id, {
        name,
        description,
        stock,
        category,
        imageUrl
      }, {
        new: true
      })

      const productDocument = updateProduct.toObject()
      delete productDocument._id

      await elasticCLient.index({
        index: 'products',
        id: updateProduct._id.toString(),
        document: productDocument
      })

      await clientRedis.del('products')

      return res.json(updateProduct)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async deleteProduct (req, res) {
    const { _id } = req.params

    try {
      const findProduct = await Product.findById({ _id })

      if (!findProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      const deleteProduct = await Product.findByIdAndDelete(_id)

      await elasticCLient.delete({
        index: 'products',
        id: _id
      })

      await clientRedis.del('products')

      return res.status(204).json(deleteProduct)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async searchProduct (req, res) {
    const query = req.query.q

    if (!query) {
      return res.status(400).json({ message: "Debe proporcionar un parametro de busqueda 'q'" })
    }

    try {
      const search = await elasticCLient.search({
        index: 'products',
        query: {
          multi_match: {
            query,
            fields: ['name', 'description', 'category']
          }
        }
      })

      const products = search.hits.hits.map(hit => hit._source)

      return res.json(products)
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
