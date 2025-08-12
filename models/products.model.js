import mongoose from 'mongoose'

const { Schema } = mongoose

const productsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: [String],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: false
})

const Product = mongoose.model('Products', productsSchema)

export default Product
