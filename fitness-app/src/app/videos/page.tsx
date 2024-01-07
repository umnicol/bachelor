"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import VideoCard from '../components/VideoCard/VideoCard';
import { getChallengesData } from '../services/challengesAPI';
import styles from './page.module.scss';
import { auth } from '../../../firebaseConfig';
import NavBar from '../components/NavBar/NavBar';

interface Challenge {
  title: string;
  previewPath: string;
}

const Videos: React.FC = () => {
  const [challengesData, setChallengesData] = useState<Challenge[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getChallengesData()) as Challenge[];
      setChallengesData(data);
      setLoading(false);
    };

    fetchData();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please sign in to access videos.</p>;
  }

  return (
    <>
      <Head>
        <title>Laurafit - All Videos</title>
        <meta name="description" content="Explore all fitness videos on Laurafit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar isLoggedIn={!!user} />
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
