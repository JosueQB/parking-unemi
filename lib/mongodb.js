import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function pingMongoDB() {
  try {
    const client = await clientPromise
    await client.db().admin().ping()
    return { status: 'success', message: 'Connected to MongoDB successfully' }
  } catch (error) {
    return { status: 'error', message: error.message }
  }
}

export default clientPromise
