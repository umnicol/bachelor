"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import ChallengePreview from '../../components/ChallengePreview/ChallengePreview';
import { getChallengesData } from '../../services/challengesAPI';

export interface Challenge {
    title: string;
    previewPath: string;
    numberOfVideos: number;
    videoLength: string;
    fitnessLevel: string;
  }

const PreviewPage: React.FC = () => {
  const [challengesData, setChallengesData] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewPath, setPreviewPath] = useState<string | null>(null);

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
  }, []);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = decodeURIComponent(pathSegments[pathSegments.length - 1]);
    setPreviewPath(lastSegment);
  }, [challengesData, previewPath]);

  if (loading || !previewPath) {
    // Handle loading state or redirect
    return <div>Loading...</div>;
  }

  const challenge = challengesData.find((c) => c.previewPath === previewPath);

  if (!challenge) {
    // Handle case where challenge is not found
    return <div>Challenge not found</div>;
  }

  return (
    <>
      <Head>
        <title>LauraFit - {challenge.title}</title>
        <meta name="description" content="write something here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        <h2>Challenge Preview</h2>
        <ChallengePreview video={challenge} />
      </div>
    </>
  );
};

export default PreviewPage;