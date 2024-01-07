"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import ChallengePreview from '../../components/ChallengePreview/ChallengePreview';
import { getChallengesData } from '../../services/challengesAPI';
import { Challenge } from '@/app/interfaces/challengeInterface';
import ChallengeInformation from '@/app/components/ChallengeInformation/ChallengeInformation';
import { auth } from '../../../../firebaseConfig';
import NavBar from '../../components/NavBar/NavBar'; // Import NavBar component

const Preview: React.FC = () => {
  const [challengesData, setChallengesData] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewPath, setPreviewPath] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChallengesData();
        setChallengesData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching challenges data:', error);
      }
    };

    fetchData();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = decodeURIComponent(pathSegments[pathSegments.length - 1]);
    setPreviewPath(lastSegment);
  }, [challengesData, previewPath]);

  if (!user) {
    return <p>Please sign in to view this challenge.</p>;
  }

  if (loading || !previewPath) {
    return <div>Loading...</div>;
  }

  const challenge = challengesData.find((c) => c.previewPath === previewPath);

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <>
      <Head>
        <title>LauraFit - {challenge.title}</title>
        <meta name="description" content="write something here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar isLoggedIn={!!user} />
      <ChallengePreview video={challenge} />
      <ChallengeInformation video={challenge} />
    </>
  );
};

export default Preview;
