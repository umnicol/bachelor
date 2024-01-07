import Link from 'next/link';
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
    <Link href="/videos">
       <Box label="CARDIO" />    
     </Link>
     <Link href="/videos">
       <Box label="STRENGHT" />    
     </Link>
     <Link href="/videos">
       <Box label="HIIT" />    
     </Link>
     <Link href="/videos">
       <Box label="STRETCH" />    
     </Link>
    </div></div>
  );
};

export default CategorySection;
