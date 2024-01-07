"use client"
import Head from 'next/head'
import SignUpForm from '../components/SignUpForm/SignUpForm'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Laurafit - Sign In</title>
        <meta name="description" content="Sign up into the Laurafit platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SignUpForm/>
    </>
  )
}