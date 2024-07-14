import { useSession, getSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Navbar from '../../components/navbar'
import styles from '../../styles/PrincipalPage.module.css';

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const res = await fetch('http://localhost:3000/api/parkingData');
  const data = await res.json();

  return {
    props: { session, data },
  }
}

export default function AdminPage({ session, data }) {
  const { data: clientSession } = useSession()

  return (
    <div className={styles.container}>
      <Navbar />
      <div className='mt-20 px-10'>
        <div className="container px-1 p-2 shadow">
          <h2 className="text-center mb-4 text-black font-extrabold text-5xl p-4">PANEL DE CONTROL</h2>
          <div className="flex flex-wrap -mx-2">

            <div className="w-full md:w-1/4 px-2 mb-4 text-black">
              <div className="bg-orange-300 shadow rounded-lg p-4 hover:bg-orange-500 hover:text-white">
                <h5 className="font-bold">Total de Espacios</h5>
                <p> {data.totalSpaces} </p>
              </div>
            </div>

            <div className="w-full md:w-1/4 px-2 mb-4 text-black">
              <div className="bg-orange-300 shadow rounded-lg p-4  hover:bg-orange-500 hover:text-white">
                <h5 className="font-bold">Espacios Ocupados</h5>
                <p> {data.occupiedSpaces} </p>
              </div>
            </div>

            <div className="w-full md:w-1/4 px-2 mb-4 text-black">
              <div className="bg-orange-300 shadow rounded-lg p-4  hover:bg-orange-500 hover:text-white">
                <h5 className="font-bold">Espacios Disponibles</h5>
                <p> {data.availableSpaces} </p>
              </div>
            </div>

            <div className="w-full md:w-1/4 px-2 mb-4 text-black">
              <div className="bg-orange-300 shadow rounded-lg p-4  hover:bg-orange-500 hover:text-white">
                <h5 className="font-bold">Tasa de Ocupacion</h5>
                <p>{data.occupancyRate.toFixed(0)} %  </p>
              </div>
            </div>

            <div className="w-full md:w-1/4 px-2 mb-4 text-black">
              <div className="bg-white shadow rounded-lg p-4 border-8">
                <h5 className="font-semibold text-center">Zona de Parqueo</h5>
                <table className="table-auto border-separate w-full mt-2 p-1">
                  <tbody className='bg-orange-100'>
                    {data.zones.map((zone) => (
                      <tr key={zone.estacionamiento}>
                        <th className="text-left">{zone.estacionamiento}</th>
                        <td>{zone.numeroSensor ? '✅' : '⛔'}{zone.numeroSensor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link href={'/admin/ManageZone'}><button className="mx-8 border-4 flex-shrink  bg-gray-100 hover:text-white hover:bg-gray-700 rounded-lg p-1 ">Manage Zone</button></Link>
              </div>
            </div>

            <div className="w-full md:w-1/4 text-black">
              <div className="bg-white shadow rounded-lg p-4 border-8">
                <h5 className="font-semibold text-center">Espacios Disponibles</h5>
                <table className="table-auto border-separate w-full mt-2 p-1">
                  <tbody className='bg-orange-100'>
                    {data.sensors.map((sensor) => (
                      <tr key={sensor._id} >
                        <th className="text-left">{sensor.name}</th>
                        <td className="text-left size-1"> {sensor.status ? '🔴 ocupado':'🟢 Disponible' } </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full md:w-1/4 px-2 mb-4 text-black">
              <div className="bg-white shadow rounded-lg p-4 border-8">
                <h5 className="font-semibold text-center">Gestion de Usuarios</h5>
                <table className="table-auto border-separate w-full p-1 ">
                  <tbody className='bg-orange-100 p-1'>
                    <tr>
                      <th className="text-left">Administrador</th>
                      <td>{data.users.filter(user => user.role === 'admin').length} </td>
                    </tr>

                    <tr>
                      <th className="text-left">Conductores</th>
                      <td>{data.users.filter(user => user.role === 'conductor').length}</td>
                    </tr>
                  </tbody>
                </table>
                <Link href={'/MostrarUsers'}><button className="border-4 mx-12 bg-gray-100 hover:text-white hover:bg-gray-700 rounded-lg p-1">Manage Users</button></Link>
              </div>
            </div>

            <div className="w-full md:w-1/4 px-2 text-black">
              <div className="bg-white shadow rounded-lg p-4 border-8">
                <h5 className="font-semibold text-center">Reportes</h5>
                <table className="table-auto border-separate w-full mt-2">
                  <tbody className='bg-orange-100 m-2'>
                    <tr>
                      <th className="text-left">Parqueos Usados</th>
                      <td><Link href={'/admin/parking'}><button className="bg-orange-100 hover:text-white hover:bg-green-700 rounded-md">👀 ver</button></Link></td>
                    </tr>
                    <tr>
                      <th className="text-left">Reportes</th>
                      <td><button className="bg-orange-100 hover:text-white hover:bg-green-700 rounded-md">👀 Ir</button></td>
                    </tr>
                    <tr>
                      <th className="text-left">Notificar</th>
                      <td><button className="bg-orange-100 hover:text-white hover:bg-green-700 rounded-md">👀 Ir</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

  );
}
