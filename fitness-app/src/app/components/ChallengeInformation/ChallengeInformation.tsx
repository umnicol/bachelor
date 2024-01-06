import React, { useEffect } from 'react';
import styles from './ChallengeInformation.module.scss';
import { getChallengesData } from '../../services/challengesAPI';
import Button from '../Button/Button';
import { Challenge } from '@/app/interfaces/challengeInterface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ChallengeInformationProps {
  video: Challenge;
}

const ChallengeInformation: React.FC<ChallengeInformationProps> = ({ video }) => {
  useEffect(() => {
    const fetchChallengesData = async () => {
      try {
        const challengesData = await getChallengesData();
        const matchingChallenge = challengesData.find((challenge) => challenge.title === video.title);

        if (!matchingChallenge) {
          console.error(`No matching challenge found for title: ${video.title}`);
        }
      } catch (error) {
        console.error('Error fetching challenges data:', error);
      }
    };

    fetchChallengesData();
  }, [video.title]);

  console.log('Matching challenge:', video);

  return (
    <div className={styles.videoInfoLayout}>
      <div className={styles.infoContainer}>
        <h2>{video.title}</h2>
        <h3>Information about the programme</h3>
        <p>{video.information}</p>
        <p>Start the programme and share your progress with us on our social media and be included in our motivation page!</p>
        <div className={styles.socialIcons}>
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          <FontAwesomeIcon icon={faTiktok} className={styles.icon} />
        </div>
        <div className={styles.buttonContainer}>
          <Button label={'Start Now'}></Button>
        </div>
      </div>
      <div className={styles.recipeContainer}>
      <h2>Fuel Yourself Properly</h2>
      <p>Unlock peak performance with smart nutrition. Discover the secrets of pre and post-workout fueling for faster results. Hungry for success? Gonna fuel it together!</p>
      <div className={styles.recipeSection}>
          <h4>Pre workout meals</h4>
        </div>

        <div className={styles.recipeSection}>
          <h4>post workout meals</h4>
        </div>

        <div className={styles.hungryForMore}>
          <h2>hungry for more?</h2> 
          <FontAwesomeIcon icon={faArrowRight} />        
        </div>
      </div>
    </div>
  );
};

export default ChallengeInformation;
