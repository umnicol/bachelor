"use client"
import Head from 'next/head'
import SignInForm from '../components/SignInForm/SignInForm'
import SignUpPlan from '../components/SignUpPlan/SignUpPlan'
import SignUpMethod from '../components/SignUpMethod/SignUpMethod'
import SignUpCard from '../components/SignUpCard/SignUpCard'


export default function SignIn() {
  return (
    <>
      <Head>
        <title>Laurafit - Sign In</title>
        <meta name="description" content="nieco sem" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <SignInForm/>
      <SignUpPlan/>
      <SignUpMethod/>
      <SignUpCard/>

    </>
  )
}