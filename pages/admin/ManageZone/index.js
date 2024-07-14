import { useState } from 'react';
import Link from 'next/link';
import clientPromise from '../../../lib/mongodb';
import Navbar from '../../../components/navbar';

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db('db_unemi_parking');
  const parkings = await db.collection('parking').find({}).toArray();

  return {
    props: { parkings: JSON.parse(JSON.stringify(parkings)) },
  };
}

export default function ManageParkingsPage({ parkings }) {
  const [parkingList, setParkingList] = useState(parkings);
  const [newParking, setNewParking] = useState({ estacionamiento: '', anden: '', numeroSensor: '' });
  const [editingParking, setEditingParking] = useState(null);

  const handleParkingChange = (e) => {
    setNewParking({ ...newParking, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditingParking({ ...editingParking, [e.target.name]: e.target.value });
  };

  const addParking = async () => {
    const res = await fetch('/api/admin/parking/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newParking),
    });

    if (res.ok) {
      const parking = await res.json();
      setParkingList([...parkingList, parking]);
      setNewParking({ estacionamiento: '', anden: '', numeroSensor: '' });
    }
  };

  const editParking = async (id, updatedParking) => {
    const res = await fetch('/api/admin/parking/edit', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updatedParking }),
    });

    if (res.ok) {
      const updatedParking = await res.json();
      setParkingList(parkingList.map(parking => (parking._id === id ? updatedParking : parking)));
      setEditingParking(null);
    }
  };

  const deleteParking = async (id) => {
    const res = await fetch('/api/admin/parking/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setParkingList(parkingList.filter(parking => parking._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Manage Parkings</h1>
        <Link href="/admin" className="text-orange-500 hover:underline">← Back to dashboard</Link>
        <div className="bg-white rounded-lg shadow-lg p-6 my-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Parking</h2>
          <div className="space-y-4">
            <select
              name="estacionamiento"
              value={newParking.estacionamiento}
              onChange={handleParkingChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500"
            >
              <option value="">Select Estacionamiento</option>
              <option value="Parqueo Frentera">Parqueo Frentera</option>
              <option value="Parqueo Zona Sur">Parqueo Zona Sur</option>
            </select>
            <select
              name="anden"
              value={newParking.anden}
              onChange={handleParkingChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500"
            >
              <option value="">Select Anden</option>
              <option value="1">Anden 1</option>
              <option value="2">Anden 2</option>
              <option value="3">Anden 3</option>
              <option value="4">Anden 4</option>
            </select>
            <select
              name="numeroSensor"
              value={newParking.numeroSensor}
              onChange={handleParkingChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500"
            >
              <option value="">Select Numero de Sensor</option>
              <option value="1">Sensor 1</option>
              <option value="2">Sensor 2</option>
              <option value="3">Sensor 3</option>
              <option value="4">Sensor 4</option>
            </select>
            <button
              onClick={addParking}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-700"
            >
              Add Parking
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Parkings List</h2>
        {parkingList.length === 0 ? (
          <p>No parkings found.</p>
        ) : (
          <ul className="space-y-4">
            {parkingList.map((parking) => (
              <li key={parking._id} className="bg-white rounded-lg shadow-lg p-4">
                {editingParking?._id === parking._id ? (
                  <div className="space-y-4">
                    <select
                      name="estacionamiento"
                      value={editingParking.estacionamiento}
                      onChange={handleEditChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500"
                    >
                      <option value="">Select Estacionamiento</option>
                      <option value="Parqueo Frentera">Parqueo Frentera</option>
                      <option value="Parqueo Zona Sur">Parqueo Zona Sur</option>
                    </select>
                    <select
                      name="anden"
                      value={editingParking.anden}
                      onChange={handleEditChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500"
                    >
                      <option value="">Select Anden</option>
                      <option value="1">Anden 1</option>
                      <option value="2">Anden 2</option>
                      <option value="3">Anden 3</option>
                      <option value="4">Anden 4</option>
                    </select>
                    <select
                      name="numeroSensor"
                      value={editingParking.numeroSensor}
                      onChange={handleEditChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-orange-500"
                    >
                      <option value="">Select Numero de Sensor</option>
                      <option value="1">Sensor 1</option>
                      <option value="2">Sensor 2</option>
                      <option value="3">Sensor 3</option>
                      <option value="4">Sensor 4</option>
                    </select>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => editParking(parking._id, editingParking)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingParking(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p><strong>Estacionamiento:</strong> {parking.estacionamiento}</p>
                    <p><strong>Anden:</strong> {parking.anden}</p>
                    <p><strong>Numero de Sensor:</strong> {parking.numeroSensor}</p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setEditingParking(parking)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteParking(parking._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
