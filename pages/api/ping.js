import { pingMongoDB } from '../../lib/mongodb'

export default async function handler(req, res) {
  const result = await pingMongoDB()
  res.status(result.status === 'success' ? 200 : 500).json(result)
}
