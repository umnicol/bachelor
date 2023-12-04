import React from 'react';
import Image from 'next/image';
import Button from '../Button/Button';

type NavBarProps = {
  logo?: string;
};

const NavBar: React.FC<NavBarProps> = ({ logo = '/logo-laurafit.png' }) => {
  return (
    <nav className="navbarContainer">
      <div>
        <Image src={logo} alt="Logo" width={100} height={50} />
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">FAQS</a>
        </li>
      </ul>
      <Button label={'Sign In'}/>
    </nav>
  );
};

export default NavBar;