"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from '../../components/NavBar/NavBar';
import VideoDetails from '../../components/VideoDetails/VideoDetails';
import { getChallengesData } from '../../services/challengesAPI';
import { Challenge } from '@/app/interfaces/challengeInterface';

const VideoPage: React.FC = () => {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [videoData, setVideoData] = useState<Challenge | null>(null);
  
    useEffect(() => {
      // Extract videoId from query parameters
      const searchParams = new URLSearchParams(window.location.search);
      const videoId = searchParams.get('videoId') || null;
      console.log('Video ID from query parameters:', videoId);
      setVideoId(videoId);
  
      // Fetch data and set it in state
      const fetchData = async () => {
        try {
          const data = await getChallengesData();
          console.log('Challenges data:', data);
  
          if (videoId) {
            const matchingChallenge = data.find((c) => c.videos[videoId]);
            console.log('Matching challenge:', matchingChallenge);
  
            if (matchingChallenge) {
              setVideoData(matchingChallenge);
            } else {
              console.error(`No matching challenge found for videoId: ${videoId}`);
            }
          } else {
            console.error('No videoId provided');
          }
        } catch (error) {
          console.error('Error fetching challenges data:', error);
        }
      };
  
      fetchData();
    }, [videoId]);

  if (!videoId || !videoData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Write something here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar isLoggedIn={true /* Assuming the user is authenticated on this page */} />
      <div>
        <VideoDetails videoData={videoData} videoId={videoId} onComplete={() => {}} />
      </div>
    </>
  );
};

export default VideoPage;
