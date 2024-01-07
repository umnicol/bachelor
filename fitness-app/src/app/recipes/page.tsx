"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './page.module.scss';
import { auth } from '../../../firebaseConfig';
import NavBar from '../components/NavBar/NavBar';
import { Recipe } from '../interfaces/recipesInterface';
import { getRecipesData } from '../services/recipesAPI';
import RecipeCard from '../components/RecipeCard/RecipeCard';

const Recipes: React.FC = () => {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getRecipesData()) as Recipe[];
      setRecipesData(data);
      setLoading(false);
    };

    fetchData();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please sign in to access videos.</p>;
  }

  return (
    <>
      <Head>
        <title>Laurafit - All Videos</title>
        <meta name="description" content="Explore all recipes by Laurafit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar isLoggedIn={!!user} />
      <div className={styles.container}>
        {recipesData.map((recipe, index) => (
          <div key={index} className={styles.videoCardContainer}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Recipes;
