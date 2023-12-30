import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: (e: React.FormEvent) => void;
  label: string;
  type?: "button" | "submit" | "reset"; 
};

function Button({ 
    onClick, label }: ButtonProps) 
    {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;