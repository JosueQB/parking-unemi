import { useState } from 'react'
import Link from 'next/link'
import clientPromise from '../../../lib/mongodb'
import FormattedDate from '../../../components/FormattedDate'
import Navbar from '../../../components/navbar'
export async function getServerSideProps(context) {
  const client = await clientPromise
  const db = client.db('db_unemi_parking')
  const users = await db.collection('users').find({}).toArray()

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  }
}

export default function ManageUsersPage({ users }) {
  const [userList, setUserList] = useState(users)

  const changeUserRole = async (email, newRole) => {
    const res = await fetch('/api/admin/change-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newRole }),
    })
    const updatedUser = await res.json()
    setUserList(userList.map(user => (user.email === email ? updatedUser : user)))
  }

  const changeUserStatus = async (email, newStatus) => {
    const res = await fetch('/api/admin/change-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newStatus }),
    })
    const updatedUser = await res.json()
    setUserList(userList.map(user => (user.email === email ? updatedUser : user)))
  }

  return (
    <div>
      <Navbar/>
      <h1>Manage Users</h1>
      <Link href="/admin">← Back to admin panel</Link>
      {userList.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {userList.map(user => (
            <li key={user.email}>
              {user.image && <img src={user.image} alt={`${user.name}'profile picture`} width="100" />}
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> {user.status === 1 ? 'Activo' : 'Inactivo'}</p>
              <p><strong>Registered At:</strong> <FormattedDate date={user.createdAt} /></p>
              <select
                value={user.role}
                onChange={e => changeUserRole(user.email, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="conductor">Conductor</option>
              </select>
              <select
                value={user.status}
                onChange={e => changeUserStatus(user.email, parseInt(e.target.value))}
              >
                <option value={0}>Inactivo</option>
                <option value={1}>Activo</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
