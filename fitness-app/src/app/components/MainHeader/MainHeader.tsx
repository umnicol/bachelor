"use client"
// MainHeader.tsx
import React, { useState } from 'react';
import styles from './MainHeader.module.scss';
import Link from 'next/link';

interface MainHeaderProps {
  image?: string;
  onSignIn: (enteredEmail: string) => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ image = '/laurafit-background.jpg', onSignIn }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(email);
  };

  return (
    <header className={styles.header} style={{ backgroundImage: `url(${image})` }}>
      <h2 className={styles.mainheader_h2}>LET'S REACH YOUR GOALS TOGETHER</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email to become a new member</label>
        <input
          placeholder="Your email address"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Link href={`/signin?email=${encodeURIComponent(email)}`} passHref>
            <button className={styles.mainheader_button} type="submit">
             Sign In
            </button>
        </Link>
      </form>
    </header>
  );
};

export default MainHeader;
