import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('db_unemi_parking');

  switch (req.method) {
    case 'GET':
      const totalSpaces = await db.collection('sensors').countDocuments();
      const occupiedSpaces = await db.collection('sensors').countDocuments({ status: 1 });
      const availableSpaces = totalSpaces - occupiedSpaces;
      const occupancyRate = (occupiedSpaces / totalSpaces) * 100;
      const zones = await db.collection('parking').find({}).toArray();
      const sensors = await db.collection('sensors').find({}).toArray();
      const users = await db.collection('users').find({}).toArray();
      
      res.json({
        totalSpaces,
        occupiedSpaces,
        availableSpaces,
        occupancyRate,
        zones,
        sensors,
        users
      });
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
