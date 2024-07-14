import { useSession, getSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '../../components/navbarConductor'

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'conductor') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function ConductorDashboard({ session }) {
  const { data: clientSession } = useSession();

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Conductor Dashboard</h1>
          <p className="text-center mb-4 text-gray-700">
            Bienvenido, {clientSession?.user?.email || session.user.email}
          </p>
          <button
            onClick={() => signOut()}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-200 mb-4"
          >
            Cierrar Sesion
          </button>
          <p className="text-center text-gray-700">
            Bienvenido!!!
          </p>
        </div>
      </div>
    </div>
  );
}
