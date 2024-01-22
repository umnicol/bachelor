import { useState, useEffect } from 'react';
import styles from './SignInForm.module.scss';
import Button from '../Button/Button';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../../../firebaseConfig';

interface SignInFormProps {
  initialEmail?: string;
  onSignIn: (enteredEmail: string, enteredPassword: string) => void;
} //function called when the user submits the form

const SignInForm: React.FC<SignInFormProps> = ({ initialEmail, onSignIn }) => {
  const [username, setUsername] = useState<string>(initialEmail || '');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
//manages the state of username, password and error that thair initial value is null of the type string
  const auth = getAuth(firebaseApp);
//function to get athentication from firebase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
//asynchronous function that handles form submission
    try {
      setError(null); //to clear previous error messages
      await signInWithEmailAndPassword(auth, username, password);
      setUsername('');
      setPassword('');
      // sign-in with the provided username and pasword using Firebase function and clears inputs for secutirty reasons
      onSignIn(username, password);
    } catch (error) {
      console.error('Firebase Auth Error:', error);
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Wrong credentials. Please check your email and password.');
          break;
        default:
          setError('An error occurred during sign-in. Please try again later.');
          break;
    }
    }
  };

  useEffect(() => {
    setUsername(initialEmail || '');
  }, [initialEmail]);
//to update username if initialEmail prop changes
  return (
    <div className={styles.signinformContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <input
          type="text"
          id="username"
          placeholder="E-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button label="Sign In" />

        <p>
          Not a member yet?{' '}
          <span>
            <Link href="/signup">Sign up NOW</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
