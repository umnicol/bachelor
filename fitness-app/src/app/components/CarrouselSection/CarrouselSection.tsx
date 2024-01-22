import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './CarrouselSection.module.scss';
import { Challenge } from '@/app/interfaces/challengeInterface';
import VideoCard from '../VideoCard/VideoCard';

interface CarrouselSectionProps {
  videos: Challenge[] 
}

const CarrouselSection: React.FC<CarrouselSectionProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [videos]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos!.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos!.length - 1 ? 0 : prevIndex + 1));
  };

  if (!videos || videos.length === 0) {
    return <p>Loading...</p>;
  }

  const videosToShow = Array.from({ length: 5 }, (_, i) => (currentIndex + i - 2 + videos.length) % videos.length);

  return (
    <div className={styles.carrousel_h2}>
      <h2>EXPLORE MORE CHALLENGES</h2>
      <div className={styles.carrousel}>
        <button onClick={goToPrevious}>Previous</button>
        {videosToShow.map((index) => (
          <Link key={index} href="/videos">
            <VideoCard video={videos[index]} />
          </Link>
        ))}
        <button onClick={goToNext}>Next</button>
      </div>
    </div>
  );
};

export default CarrouselSection;
