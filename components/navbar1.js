"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar1.module.css';
import { useRouter } from 'next/router';


export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const menuLink = document.querySelector(`.${styles.menu} a[href="#${id}"]`);

          if (entry.isIntersecting) {
            document.querySelector(`.${styles.menu} a.${styles.selected}`).classList.remove(styles.selected);
            menuLink.classList.add(styles.selected);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    document.querySelectorAll(`.${styles.menu} a[href^="#"]`).forEach((menuLink) => {
      const hash = menuLink.getAttribute("href");
      const target = document.querySelector(hash);
      if (target) {
        observer.observe(target);
      }
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const hash = url.split('#')[1];
      if (hash) {
        const menuLink = document.querySelector(`.${styles.menu} a[href="#${hash}"]`);
        if (menuLink) {
          document.querySelector(`.${styles.menu} a.${styles.selected}`).classList.remove(styles.selected);
          menuLink.classList.add(styles.selected);
        }
      }
    };

    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router]);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <header className={styles.topheader}>
      <nav className={styles.topnav}>
        <button className={styles.openMenu} aria-label="Abrir menú" onClick={toggleMenu}>
          <Image src="/img/hamburger-icon.svg" alt="Abrir menú" width={24} height={24} />
        </button>
        <ul className={`${styles.menu} ${menuOpened ? styles.menu_opened : ""}`}>
          <button className={styles.closeMenu} aria-label="Cerrar menú" onClick={toggleMenu}>
            <Image src="/img/close-icon.svg" alt="cerrar menú" width={24} height={24} />
          </button>
          <li><Link href="#inicio"><span className={router.asPath === '/#inicio' ? styles.selected : ''}>Inicio</span></Link></li>
          <li><Link href="#parqueaderos"><span className={router.asPath === '/#parqueaderos' ? styles.selected : ''}>Parqueaderos</span></Link></li>
          <li><Link href="#servicios"><span className={router.asPath === '/#servicios' ? styles.selected : ''}>Servicios</span></Link></li>
          <li><Link href="#restricciones"><span className={router.asPath === '/#restricciones' ? styles.selected : ''}>Restricciones</span></Link></li>
          <li><Link href="#mision"><span className={router.asPath === '/#mision' ? styles.selected : ''}>Misión</span></Link></li>
        </ul>
      </nav>
    </header>
  );
}
