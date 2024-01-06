"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import SignInForm from '../components/SignInForm/SignInForm';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firebaseApp } from '../../../firebaseConfig';

const firebaseAuth = getAuth(firebaseApp);

export default function SignIn() {
  const [email, setEmail] = useState('');

  const handleSignIn = async (enteredEmail: string, enteredPassword: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, enteredEmail, enteredPassword);
      // User signed in successfully
      const user = userCredential.user;
      setEmail(enteredEmail);
      window.location.href = '/videos';
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  useEffect(() => {
    // Extracting email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlEmail = urlParams.get('email') || '';
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
