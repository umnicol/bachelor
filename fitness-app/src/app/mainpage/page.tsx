"use client"
import Head from 'next/head'
import CarrouselSection from '../components/CarrouselSection/CarrouselSection'
import CategorySection from '../components/CategorySection/CategorySection'
import FollowUs from '../components/FollowUs/FollowUs'
import HeaderMainPage from '../components/HeaderMainPage/HeaderMainPage'
import MotivationSection from '../components/MotivationSection/MotivationSection'
import NavBar from '../components/NavBar/NavBar'
import RecipeSection from '../components/RecipesSection/RecipeSection'

export default function SignUp() {
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
  )
}
