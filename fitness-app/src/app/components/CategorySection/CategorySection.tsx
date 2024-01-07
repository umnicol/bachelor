import React from 'react';
import styles from './CategorySection.module.scss';


interface CategorySectionProps {
  label: string;
}

const Box: React.FC<CategorySectionProps> = ({ label }) => {
  return (
    <div className={styles.categorybox}>
    <span className={styles.categorylabel}>{label}</span>
    </div>
  );
};

const CategorySection: React.FC = () => {
  return (
    <div className={styles.categorytitle}>
    <h2>OR FIND YOUR TRAINING STYLE</h2>
    <p>and all challenges related to it</p>
    <div className={styles.categorycontainer}>
      <Box label="CARDIO" />
      <Box label="STRENGHT" />
      <Box label="HIIT" />
      <Box label="STRETCH" />
    </div></div>
  );
};

export default CategorySection;
