// src/app/components/VideoDetails/VideoDetails.tsx
import React from 'react';
import Image from 'next/image';
import { Challenge } from '@/app/interfaces/challengeInterface';

interface VideoDetailsProps {
  videoData: Challenge; 
  videoId: string;
  onComplete: () => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ videoData, videoId, onComplete }) => {
  const videoInfo = videoData[videoId];

  if (!videoInfo) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <h2>{`Video ${videoId.split('_')[2]} Details`}</h2>
      <div>
        <Image
          src={videoInfo.videoUrl} // Assuming videoUrl contains the image URL
          alt={`Video ${videoId.split('_')[2]}`}
          width={600} // Set the width as needed
          height={400} // Set the height as needed
        />
      </div>
      <h2>{videoInfo.title}</h2>
      <p>Exercise Rounds: {videoInfo.exerciseRounds}</p>
      <p>Exercise Information: {videoInfo.exerciseInformation}</p>
      <p>Type of Exercise: {videoInfo.typeOfExercise}</p>
      <p>Video Information: {videoInfo.videoInformation}</p>
      <p>Video Length: {videoInfo.videoLength}</p>
      
      <button onClick={onComplete}>Complete Video</button>
    </div>
  );
};

export default VideoDetails;
