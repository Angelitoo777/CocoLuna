import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.HOST_MONGODB)
    console.log('MongoDB is connected')
  } catch (error) {
    throw new Error(error)
  }
}
