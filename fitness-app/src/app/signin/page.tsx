"use client"
// SignIn.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import SignInForm from '../components/SignInForm/SignInForm';

export default function SignIn() {
  const [email, setEmail] = useState('');

  const handleSignIn = (enteredEmail: string) => {
    setEmail(enteredEmail);
  };

  useEffect(() => {
    // Extract the email parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlEmail = urlParams.get('email') || '';

    // Set the email state based on the URL parameter
    setEmail(urlEmail);
  }, []);

  return (
    <>
      <Head>
        <title>Laurafit - Sign In</title>
        <meta name="description" content="nieco sem" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <SignInForm initialEmail={email} onSignIn={handleSignIn} />
    </>
  );
}
