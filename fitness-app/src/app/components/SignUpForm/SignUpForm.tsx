
import { useState } from 'react';
import styles from './SignUpForm.module.scss';
import Button from '../Button/Button';


const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform authentication logic
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className={styles.signupformContainer}>
      <form onSubmit={handleSubmit}>
        <p>Step 1 of 3</p>
      <h2>Create a password to start your membership!</h2>
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
          placeholder='Create password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button label={'Next'} />
      </form>
    </div>
  );
};

export default SignUpForm;
