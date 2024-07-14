import { useSession, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../components/navbar'

export async function getServerSideProps(context) {
  const session = await getSession(context);

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
    props: { session, initialData: data },
  };
}

export default function ConductorDashboard({ session, initialData }) {
  const { data: clientSession } = useSession();
  const [sensors, setSensors] = useState(initialData.sensors);

  useEffect(() => {
    const updateSensors = async () => {
      const res = await axios.get('http://localhost:3000/api/parkingData');
      setSensors(res.data.sensors);
    };

    const intervalId = setInterval(updateSensors, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    sensors.forEach((sensor, index) => {
      const spaceElement = document.getElementById(`space-${index + 1}`);
      if (spaceElement) {
        const imageUrl = sensor.status ? '/img/car_red.png':'/img/car_green.png';
        const imageElement = spaceElement.querySelector('image');
        if (imageElement) {
          imageElement.setAttribute('href', imageUrl);
        } else {
          const newImageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          newImageElement.setAttribute('href', imageUrl);
          newImageElement.setAttribute('width', '25%');
          newImageElement.setAttribute('height', '25%');
          newImageElement.setAttribute('x', 0);
          newImageElement.setAttribute('y', 0);
          spaceElement.appendChild(newImageElement);
        }
      }
    });
  }, [sensors]);

  return (
    <div>
      <Navbar/>
      <div className='mx-auto flex justify-center m-20' style={{ backgroundImage: 'url(/img/Sintítulo-1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
          <g id="space-1" transform="translate(-4, 70)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
          <g id="space-2" transform="translate(180, 70)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
          <g id="space-3" transform="translate(401, 70)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
          <g id="space-4" transform="translate(627, 70)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
          <g id="space-5" transform="translate(-4, 315)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
          <g id="space-6" transform="translate(181, 315)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
          <g id="space-7" transform="translate(406, 315)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
          <g id="space-8" transform="translate(627, 315)">
            <rect fill="#002f43" stroke="#002f43" />
          </g>
        </svg>
      </div>
    </div>
  );
}
