import Link from 'next/link';
import React from 'react';
import styles from './RecipeSection.module.scss';

interface RecipeSectionProps {
  imageUrl: string;
}

const RecipeSection: React.FC<RecipeSectionProps> = ({ imageUrl}) => {
    return (
        <div>
       <div className={styles.recipescontainer}> 
        <h2>GET INSPIRED WITH OUR RECIPES</h2>
        <img src={imageUrl} alt="Photo"/>
        </div>
        <div className={styles.recipesbuttons}>
        <button> NUTRITION CALCULATOR</button>
        <Link href="/recipes">
        <button> SEE RECIPES</button>
          </Link>
         
        </div>
        </div>
      );
    };

    export default RecipeSection;