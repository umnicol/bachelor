"use client"
import React, { useState } from 'react';
import styles from './CarrouselSection.module.scss';

const CarrouselSection: React.FC = () => {
  const images = [
    '/Group21.png',
    '/Group22.png',
    '/Group23.png',
    '/Group24.png',
    '/Group25.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.carrousel_h2}>
    <h2>EXPLORE MORE CHALLENGES</h2>
    <div className={styles.carrousel}>
      <button onClick={goToPrevious}>Previous</button>
      <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
      <img src={'/Group22.png'}/>
      <img src={'/Group23.png'}/>
      <img src={'/Group24.png'}/>
      <img src={'/Group25.png'}/>
      
      <button onClick={goToNext}>Next</button>
    </div>
    </div>
  );
};

export default CarrouselSection;
