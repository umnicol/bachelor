import React from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import styles from './NavBar.module.scss';
import Link from 'next/link';

type NavBarProps = {
  logo?: string;
  onClick?: () => void;
  label?: string;
};

const NavBar: React.FC<NavBarProps> = ({ logo = '/logo-laurafit.png', onClick }) => {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="LauraFit Logo" height={55} width={135} />
        </Link>
      </div>
      <div className={styles.NavBarButton}>
      <Link href="/signin">
      <button className={styles.button} onClick={onClick}> Sign In </button>
      </Link>
     </div>
    </nav>
  );
};

export default NavBar;