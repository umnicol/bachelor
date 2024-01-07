import Head from 'next/head'
import Image from 'next/image'
import CarrouselSection from './components/CarrouselSection/CarrouselSection'
import CategorySection from './components/CategorySection/CategorySection'
import FollowUs from './components/FollowUs/FollowUs'
import HeaderMainPage from './components/HeaderMainPage/HeaderMainPage'
import MainHeader from './components/MainHeader/MainHeader'
import MotivationSection from './components/MotivationSection/MotivationSection'
import NavBar from './components/NavBar/NavBar'
import PricingPlan from './components/PricingPlan/PricingPlan'
import RecipeSection from './components/RecipesSection/RecipeSection'
import SectionLeft from './components/SectionLeft/SectionLeft'
import SubscriptionSection from './components/SubscriptionSection/SubscriptionSection'

export default function Home() {
  return (
    <>
    <Head>
        <title>LauraFit-Home</title>
        <meta name="description" content="Welcome to Pool Pub, the ultimate destination for pool enthusiasts in Copenhagen. Enjoy a night of fun, games, and great drinks with friends and family. Our expertly-crafted cocktails and wide selection of beers are sure to keep you refreshed as you play your way to victory. Visit us today and experience the thrill of Pool Pub Name for yourself!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar isLoggedIn={false}/>
      <MainHeader/>
    </>
  )
}
