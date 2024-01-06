"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import VideoCard from '../components/VideoCard/VideoCard';
import { getChallengesData } from '../services/challengesAPI';
import styles from './page.module.scss';

interface Challenge {
  title: string;
  previewPath: string;
}

const Videos: React.FC = () => {
  const [challengesData, setChallengesData] = useState<Challenge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getChallengesData()) as Challenge[];
      setChallengesData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Laurafit - All Videos</title>
        <meta name="description" content="Explore all fitness videos on Laurafit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        {challengesData.map((challenge, index) => (
          <div key={index} className={styles.videoCardContainer}>
            <VideoCard video={challenge} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Videos;
