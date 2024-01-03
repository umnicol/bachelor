"use client"
import Head from 'next/head'
import SignInForm from '../components/SignInForm/SignInForm'


export default function SignIn() {
  return (
    <>
      <Head>
        <title>Laurafit - Sign In</title>
        <meta name="description" content="nieco sem" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <SignInForm/>
    </>
  )
}