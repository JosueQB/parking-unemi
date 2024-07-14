require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://jquirozl:4pw6J4dUVDttM9TW@unemi-parking.rjw5tem.mongodb.net/"; // Usar la cadena de conexión desde el archivo .env
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // si ya existe la base de datos retorna y envia un mensaje en la consola
    if ((await client.db('admin').admin().listDatabases()).databases.some(db => db.name === 'db_unemi_parking')) {
      console.log("Database already exists");
      return;
    };

    const db = client.db('db_unemi_parking');

    // Crear la colección de roles
    const rolesCollection = db.collection('roles');
    await rolesCollection.insertMany([
      { name: 'admin', permissions: ['access_admin_dashboard', 'manage_users'] },
      { name: 'conductor', permissions: ['access_conductor_dashboard'] }
    ]);

    console.log("Roles inserted");

    // Crear la colección de usuarios
    const usersCollection = db.collection('users');
    await usersCollection.insertOne({
      name: 'Admin User',
      email: 'admin@unemi.edu.ec',
      role: 'admin',
      status: 1
    });

    console.log("Admin user inserted");

    const parkingCollection = db.collection('parking');
    await parkingCollection.insertOne({
      name: 'Parking 1',
      availableSpaces: 100,
      totalSpaces: 100
    });

    console.log("Parking inserted");

    const sensorsCollection = db.collection('sensors');
    await sensorsCollection.insertOne({
      name: 'Sensor 1',
      status: 0
    });

    console.log("Sensor inserted");

  } finally {
    await client.close();
  }
}

main().catch(console.error);
