import React from 'react';
import Image from 'next/image';
import styles from './NavBar.module.scss';
import Link from 'next/link';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../../../firebaseConfig';

type NavBarProps = {
  logo?: string;
  label?: string;
  isLoggedIn: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ logo = '/logo-laurafit.png',  isLoggedIn }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>
        {isLoggedIn ? (
          <Link href="/mainpage">
              <Image src={logo} alt="LauraFit Logo" height={55} width={135} />
          </Link>
        ) : (
          <Link href="/">
              <Image src={logo} alt="LauraFit Logo" height={55} width={135} />
          </Link>
        )}
      </div>
      <div className={styles.NavBarButton}>
        {isLoggedIn ? (
          <>
            <Link href="/videos">Videos</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/myfeed">My Feed</Link>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link href="/signin">
            <button className={styles.button}>Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
