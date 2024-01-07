import React from 'react';
import styles from './FollowUs.module.scss';
interface FollowUsProps {
  imageUrl: string;
}

const FollowUs: React.FC<FollowUsProps> = ({imageUrl }) => {
  return (
    <div className={styles.followuscontainer}>
      <h1>DO YOU WANT PEOPLE TO SEE YOUR PROGRESS?</h1>
      <p>THEN FOLLOW US ON OUR SOCIAL MEDIA</p>
      <img src={imageUrl} alt="SocialMedia" />
    </div>
  );
};

export default FollowUs;
