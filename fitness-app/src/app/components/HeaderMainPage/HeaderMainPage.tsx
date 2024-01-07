"use client"
import Image from 'next/image';
import React from 'react';
import styles from './HeaderMainPage.module.scss';
import Link from 'next/link';

interface HeaderMainPageProps {
 image?: string;
}

const HeaderMainPage: React.FC<HeaderMainPageProps> = ({image = '/img-signin.png' }) => {
 const [email, setEmail] = React.useState('');

 return (
    <header className={styles.mainpageheader} style={{ backgroundImage: `url(${image})` }}>
         <h2 className={styles.mainpageheader_h2}>DON'T WAIT</h2>
         <h2 className={styles.mainpageheader_h2_1}>START TODAY</h2>

      <Link href="/preview/https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Flaurafit-3d0b4.appspot.com%2Fo%2Fsculpt-it.jpg%3Falt%3Dmedia%26token%3Dacac9ee9-f74f-4452-ba42-cca14d11bcea">
        <button className={styles.mainpageheader_button}>JOIN THE CHALLENGE</button>
      </Link>
    </header>
 );
};

export default HeaderMainPage;