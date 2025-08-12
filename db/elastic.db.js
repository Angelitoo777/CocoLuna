import { Client } from '@elastic/elasticsearch'
import dotenv from 'dotenv'

dotenv.config()

export const elasticCLient = new Client({
  node: process.env.HOST_ELASTIC,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    apiKey: process.env.KEY_ELASTIC
  }
})
