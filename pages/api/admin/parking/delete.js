import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const client = await clientPromise;
    const db = client.db('db_unemi_parking');
    const { id } = req.body;

    await db.collection('parking').deleteOne({ _id: ObjectId(id) });
    res.status(200).json({ message: 'Parking deleted' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}