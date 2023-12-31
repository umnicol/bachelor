"use client"
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar/NavBar';
import HeaderMainPage from '../components/HeaderMainPage/HeaderMainPage';
import CarrouselSection from '../components/CarrouselSection/CarrouselSection';
import CategorySection from '../components/CategorySection/CategorySection';
import RecipeSection from '../components/RecipesSection/RecipeSection';
import MotivationSection from '../components/MotivationSection/MotivationSection';
import FollowUs from '../components/FollowUs/FollowUs';
import { auth } from '../../../firebaseConfig';

const MainPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please sign in to access the main page.</p>;
  }

  return (
    <>
      <Head>
        <title>Laurafit - MainPage</title>
        <meta name="description" content="Laurafit platform main page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar isLoggedIn={true}/>
      <HeaderMainPage/>
      <CarrouselSection/>
      <CategorySection/>
      <RecipeSection imageUrl={'/recipesphoto.png'}/>
      <MotivationSection imageUrl={'/progresspic.png'}/>
      <FollowUs imageUrl={'/socialmedia.png'}/>
    </>
  );
}

export default MainPage;
