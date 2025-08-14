import mongoose from 'mongoose'

const { Schema } = mongoose

const productsSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
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

const orderSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  purchaseDate: {
    type: Date,
    default: Date.now()
  }
})

export const Order = mongoose.model('Orders', orderSchema)

export const Product = mongoose.model('Products', productsSchema)
