// components/Carousel.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Login.module.css';

const images = [
  '/img/login1.svg',
  '/img/login2.svg',
  '/img/login3.svg',
  '/img/login4.svg',
  '/img/login5.svg',
  '/img/login6.svg',
];

export default function Carousel() {
    const [currentImage, setCurrentImage] = useState(0);
    const [fade, setFade] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setCurrentImage((prevImage) => (prevImage + 1) % images.length);
          setFade(false);
        }, 2000); // La duración de la transición debe ser la misma que en CSS
      }, 9000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className={`${styles.carouselContainer} ${fade ? styles.fade : ''}`}>
        <Image src={images[currentImage]} layout="fill" objectFit="cover" alt="Carousel Image" />
      </div>
    );
  }
