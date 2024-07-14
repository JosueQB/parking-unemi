import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Carousel from '../components/Carousel';
import Image from "next/image";
import Link from 'next/link';


export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { error } = router.query;
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.role === 'admin') {
        router.push('/admin');
      } else if (session.user.role === 'conductor') {
        router.push('/user');
      }
    }
  }, [session, status, router]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }, [error]);

  const getErrorMessage = () => {
    if (error === 'noDomain') {
      return 'Su cuenta no pertenece al dominio, por favor utilice una cuenta del dominio @unemi.edu.ec';
    }
    return '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginLeft}>
        <Carousel />
      </div>
      <div className={styles.loginRight}>
        <div className={styles.loginBox}>
          <div className={styles.logoContainer}>
            <Image src="/img/logo-unemi-park.svg" alt="Logo" width={700} height={700} />
          </div>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <p className={styles.subtitle}>Ingrese sus datos de forma correcta</p>
          {showError && (
            <div className={styles.errorContainer}>
              <div className={styles.errorHeader}>
                <span className={styles.errorIcon}>!</span>
                <span className={styles.errorTitle}>Ocurrió un error</span>
                <button className={styles.closeError} onClick={() => setShowError(false)}>×</button>
              </div>
              <p className={styles.errorMessage}>{getErrorMessage()}</p>
            </div>
          )}
          <button 
                     onClick={() => signIn('google')}  className={styles.googleButton}>
                      <Image src={'/img/icon-login.webp'} height={30} width={30} alt='Google icon' />
                      <span>Inicia Sesión con Google</span>
          </button>
          <div className={styles.backButtonContainer}>
            <Link href="/" passHref>
              <span className={styles.backLink}>Regresar al Inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}