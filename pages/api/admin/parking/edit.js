import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const client = await clientPromise;
    const db = client.db('db_unemi_parking');
    const { id, estacionamiento, anden, numeroSensor } = req.body;

    const updatedParking = {
      estacionamiento,
      anden,
      numeroSensor,
    };

    await db.collection('parking').updateOne(
      { _id: ObjectId(id) },
      { $set: updatedParking }
    );

    const result = await db.collection('parking').findOne({ _id: ObjectId(id) });
    res.status(200).json(result);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
