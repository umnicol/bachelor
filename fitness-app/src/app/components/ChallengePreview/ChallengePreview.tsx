import React from 'react';
import Image from 'next/image';
import styles from './ChallengePreview.module.scss';
import { getChallengesData } from '../../services/challengesAPI';
import Button from '../Button/Button';
import { Challenge } from '@/app/interfaces/challengeInterface';

interface ChallengePreviewProps {
    video: Challenge;
  }

const ChallengePreview: React.FC<ChallengePreviewProps> = ({ video }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchChallengesData = async () => {
      try {
        const challengesData = await getChallengesData();
        const matchingChallenge = challengesData.find((challenge) => challenge.previewPath === video.previewPath);
//fetches the data and tries to find a matching challenge on the previewPath property of each challnge
        if (matchingChallenge) {
          console.log('Matching challenge:', matchingChallenge);
          setImageUrl(matchingChallenge.previewPath);
        } else {
          console.error(`No matching challenge found for previewPath: ${video.previewPath}`);
        }
      } catch (error) {
        console.error('Error fetching challenges data:', error);
      }
    };

    fetchChallengesData();
  }, [video.previewPath]);
// re-run if the previewPath value changes
  console.log('Matching challenge:', video);
  console.log('imageUrl:', imageUrl);

  return (
    <div className={styles.videoInfoLayout}>
      <div className={styles.previewContainer}>
        {imageUrl && <Image src={imageUrl} alt={video.title} layout="fill" objectFit="cover" />}
      </div>
      <div className={styles.infoContainer}>
        <h2>{video.title}</h2>
        <p>
          Number of videos: <br /> <strong>{video.numberOfVideos}</strong>
        </p>
        <p>
          Length of the videos: <br /> <strong>{video.videoLength}</strong>
        </p>
        <p>
          Fitness level: <br /> <strong>{video.fitnessLevel}</strong>
        </p>
        <div className={styles.buttonContainer}>
        <Button label={'Start Now'}></Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengePreview;
