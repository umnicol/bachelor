"use client"
import { useState } from 'react';
import styles from './SignInForm.module.scss';
import Button from '../Button/Button';
import Link from 'next/link';


const SignInForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform authentication logic
    console.log('Username:', username);
    console.log('Password:', password);

    // Clear the form fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.signinformContainer}>
      <form onSubmit={handleSubmit}>
        <p></p>
      <h2>Sign in</h2>
        <input
          type="text"
          id="username"
          placeholder='E-mail'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          id="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button label={'Sign In'} />

        <p>
          Not a member yet?{' '}
          <span>
          <Link href={'/signup'}>Sign up NOW</Link>         
           </span>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;