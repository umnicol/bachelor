import React from 'react';
import Image from 'next/image';
import styles from './RecipeCard.module.scss';
import Link from 'next/link';

export interface RecipeCardProps {
    recipe: {
        title: string;
        imageURL: string;
      };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className={styles.videoCard}>
      <Link href={`/preview/${encodeURIComponent(recipe.imageURL)}`}>
        <div className={styles.previewContainer}>
          <Image src={recipe.imageURL} alt={recipe.title} width={300} height={200} className={styles.videoImage} />
          <div className={styles.overlay}></div>
          <div className={styles.titleOverlay}>{recipe.title}</div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
