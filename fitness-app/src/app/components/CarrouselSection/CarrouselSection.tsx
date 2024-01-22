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
//to declare a currentIndex and a function setcurrentIndex to update the state, the initial value of current state is set to 0
  useEffect(() => {
    setCurrentIndex(0);
  }, [videos]);
//ensures that the carousel starts from the beginning when the list of videos changes
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos!.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos!.length - 1 ? 0 : prevIndex + 1));
  };
//navigates to previous or next videos in carousel
  if (!videos || videos.length === 0) {
    return <p>Loading...</p>; //if the there are no videos in the array, it will show a loading message
  }

  const indicesToShow = [
    (currentIndex - 2 + videos.length) % videos.length,
    (currentIndex - 1 + videos.length) % videos.length,
    currentIndex,
    (currentIndex + 1) % videos.length,
    (currentIndex + 2) % videos.length,
  ];
// to show the current videos with two videos on each side to make 5 videos
  return (
    <div className={styles.carrousel_h2}>
      <h2>EXPLORE MORE CHALLENGES</h2>
      <div className={styles.carrousel}>
        <button onClick={goToPrevious}>Previous</button>
        {indicesToShow.map((index) => (
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
