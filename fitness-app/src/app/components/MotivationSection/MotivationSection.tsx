import React from 'react';
import styles from './MotivationSection.module.scss';

interface MotivationProps {
  imageUrl: string;
}

const MotivationSection: React.FC<MotivationProps> = ({ imageUrl}) => {
    return (
      <div>
      <div className={styles.motivationbox}>
      </div>
      
       <div className={styles.motivationcontainer}> 
        <h2>YOUR</h2>
        <h3>DAILY MOTIVATION</h3>
        <h4>REAL RESULTS FROM REAL WOMEN</h4>
        <p>“I started following the program guided <br></br>
            by the app which features various workouts, <br></br>
            nutrition tips, meal plans, recipes, and more. <br></br>
            It was exactly what I was looking for”</p>
        <img src={imageUrl} alt="Photo"/>
        </div>
        </div>
       
      );
    };

    export default MotivationSection;