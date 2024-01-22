import React, { useEffect, useState } from 'react';
import styles from './ChallengeInformation.module.scss';
import { getChallengesData } from '../../services/challengesAPI';
import Button from '../Button/Button';
import { Challenge } from '@/app/interfaces/challengeInterface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getRecipesData } from '@/app/services/recipesAPI';
import Image from 'next/image';
import { Recipe } from '@/app/interfaces/recipesInterface';

interface ChallengeInformationProps {
  video: Challenge;
}

const ChallengeInformation: React.FC<ChallengeInformationProps> = ({ video }) => {
  const [preWorkoutRecipes, setPreWorkoutRecipes] = useState<Recipe[]>([]);
  const [postWorkoutRecipes, setPostWorkoutRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const challengesData = await getChallengesData();
        const matchingChallenge = challengesData.find((challenge) => challenge.title === video.title);
        
        if (!matchingChallenge) {
          console.error(`No matching challenge found for title: ${video.title}`);
        }

        const recipesData = await getRecipesData();

        const shuffledRecipes = recipesData.sort(() => Math.random() - 0.5);
        const preWorkoutRecipes = shuffledRecipes.filter(recipe => recipe.mealType === 'pre workout').slice(0, 4);
        const postWorkoutRecipes = shuffledRecipes.filter(recipe => recipe.mealType === 'post workout').slice(0, 4);
        
        setPreWorkoutRecipes(preWorkoutRecipes);
        setPostWorkoutRecipes(postWorkoutRecipes); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [video.title]);

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
          <div className={styles.recipeImages}>
            {preWorkoutRecipes.map(recipe => (
              <div key={recipe.title} className={styles.recipeImage}>
                <Image src={recipe.imageURL} alt={recipe.title} width={200} height={150} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.recipeSection}>
          <h4>Post workout meals</h4>
          <div className={styles.recipeImages}>
            {postWorkoutRecipes.map(recipe => (
              <div key={recipe.title} className={styles.recipeImage}>
                <Image src={recipe.imageURL} alt={recipe.title} width={200} height={150} />
              </div>
            ))}
          </div>
        </div>


        <div className={styles.hungryForMore}>
        <Link href="/recipes">
          <h2>hungry for more?</h2> 
          <FontAwesomeIcon icon={faArrowRight} /> 
        </Link>       
        </div>
      </div>
    </div>
  );
};

export default ChallengeInformation;
