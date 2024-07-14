import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar1';
import styles from '../styles/PrincipalPage.module.css';  
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      if (session.user.role === 'admin') {
        router.push('/admin');
      } else if (session.user.role === 'conductor') {
        router.push('/user');
      }
    }
  }, [session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <Navbar />
        
        <section id="inicio" className={styles.section}>
            <div className={styles.sectionContent}>
                <div className={styles.sectionText}>
                    <Image src='/img/logo-unemi-park.svg' height={550} width={550} alt='logo' />
                    <p className={styles.infoApp}>Encuentra tu espacio sin complicaciones, ahorra tiempo y evítate el estrés</p>
                    <button 
                     onClick={() => router.push('/login')} className={styles.startButton}>
                      <Image src={'/img/icon-login.webp'} height={50} width={50} alt='Google icon' />
                      <span>Comienza ahora</span>
                      </button>
                </div>
                <div className={styles.sectionImage}>
                  <Image src={'/img/icon_ubi.svg'} height={500} width={500} alt='logo' />
                </div>
            </div>
          </section>


          <section id="parqueaderos" className={styles.section2}>
          <div>
            <h2>PARQUEADEROS DISPONIBLES</h2>
            <div className={styles.content}>
              <div className={styles.card}>
                <Image src="/img/ZonaFrentera.svg" width={500} height={500} alt="Parqueo Frontera" />
                <h3>PARQUEO FRENTERA</h3>
                <p>
                  Tiene una capacidad para 240 vehículos, se sitúa en la esquina frontal sureste de la Ciudadela Universitaria, a lo largo del vallado sobre la vía calle 2, paralela a la carretera Vía Km 26, desde la entrada principal al Campus hasta la vía de salida en Avda. Carrera 1; y se extiende hasta la línea de edificaciones.
                </p>
              </div>
              <div className={styles.card}>
                <Image src="/img/park-available-two.svg" width={500} height={500} alt="Parqueo Zona Sur" />
                <h3>PARQUEO ZONA SUR</h3>
                <p>
                  Tiene una capacidad para 232 vehículos, se sitúa en la esquina posterior sureste de la Ciudadela Universitaria, atrás del corredor cultural.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className={styles.section3}>
          <div>
            <h2>NUESTROS SERVICIOS</h2>
            <div className={styles.content}>
              <div className={styles.card}>
                <Image src="/img/timer-icon.svg" width={100} height={100} alt="Monitoreo en tiempo real" />
                <h3>Monitoreo en tiempo real</h3>
                <p>Puedes visualizar el estado de todos los espacios de estacionamiento en tiempo real.</p>
              </div>
              <div className={styles.card}>
                <Image src="/img/msn-icon.svg" width={100} height={100} alt="Envío de alertas" />
                <h3>Envío de alertas</h3>
                <p>Te informamos sobre eventos importantes, o cualquier información relevante.</p>
              </div>
            </div>
          </div>
        </section>


        <section id="restricciones" className={styles.section4}>
          <div className={styles.restriccionesContainer}>
            <h2>RESTRICCIONES</h2>
            <div className={styles.restriccionesContent}>
              <div className={styles.restriccionItem}>
                <h3>ACCESO RESTRINGIDO</h3>
                <p>
                  Solo los usuarios autorizados (estudiantes, personal administrativo y profesores) que cuenten con el dominio @unemi.edu.ec pueden acceder al sistema.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="mision" className={styles.section5}>
          <div className={styles.misionContainer}>
            <h2>MISIÓN</h2>
            <Image src="/img/logo-unemi-park.svg" width={700} height={700} alt="UNEMI Parking Mission" />
            <div className={styles.misionText}>
              <h3>Innovación, eficiencia y comodidad.</h3>
              <p>
                Nuestra misión es ofrecer un aplicativo de parqueo inteligente que optimice el uso de los espacios y mejore la experiencia de nuestros usuarios.
              </p>
            </div>
          </div>
        </section>


        <div className={styles.footerContainer}>
          <p>&copy; 2024 | Esthefany Maldonado - Javier Quiroz</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">Redireccionando...</h1>
    </div>
  )
}