import clientPromise from '../../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db('db_unemi_parking');
    const { estacionamiento, anden, numeroSensor } = req.body;

    const newParking = {
      estacionamiento,
      anden,
      numeroSensor,
    };

    const result = await db.collection('parking').insertOne(newParking);
    res.status(201).json(result.ops[0]);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
