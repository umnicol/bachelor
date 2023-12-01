import React from 'react';
import styles from './SignUpPlan.module.scss';
import Button from '../Button/Button';


const SignUpPlan: React.FC = () => {


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform authentication logic
  };

  return (
    <div className={styles.signupplanContainer}>
      <form onSubmit={handleSubmit}>
        <p>Step 2 of 3</p>
      <h2>Choose your plan</h2>
    

        <Button label={'Next'} />
      </form>
    </div>
  );
};

export default SignUpPlan;