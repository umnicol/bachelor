"use client"
import Image from 'next/image';
import React from 'react';
import Button from '../Button/Button';
import styles from './MainHeader.module.scss';

interface MainHeaderProps {
onClick?: () => void;
 image?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({image = '/laurafit-background.jpg',onClick }) => {
 const [email, setEmail] = React.useState('');


 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 };

 return (
    <header className={styles.header} style={{ backgroundImage: `url(${image})` }}>
         <h2 className={styles.mainheader_h2}>LET'S REACH YOUR 
            GOALS TOGETHER
        </h2>
        
        <form onSubmit={handleSubmit}>
       
        <label htmlFor="email">Enter your email to become new member</label>
      <input 
        placeholder="Your email adress"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className={styles.mainheader_button} onClick={onClick}> Sign In
    </button>
        </form>
    
    </header>
 );
};



export default MainHeader;


