"use client"
import Image from 'next/image';
import React from 'react';
import styles from './HeaderMainPage.module.scss';

interface HeaderMainPageProps {
 image?: string;
}

const HeaderMainPage: React.FC<HeaderMainPageProps> = ({image = '/img-signin.png' }) => {
 const [email, setEmail] = React.useState('');

 return (
    <header className={styles.mainpageheader} style={{ backgroundImage: `url(${image})` }}>
         <h2 className={styles.mainpageheader_h2}>DON'T WAIT</h2>
         <h2 className={styles.mainpageheader_h2_1}>START TODAY</h2>

      <button className={styles.mainpageheader_button}> JOIN THE CHALLENGE
    </button>
        
    
    </header>
 );
};

export default HeaderMainPage;