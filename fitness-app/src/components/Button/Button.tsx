import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: () => void;
  label: string;
};

function Button({ 
    onClick, 
    label }: ButtonProps) 
    {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;