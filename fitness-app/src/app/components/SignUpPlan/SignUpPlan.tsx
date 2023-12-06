import React, { useState } from 'react';
import styles from './SignUpPlan.module.scss';
import Button from '../Button/Button';

const SignUpPlan: React.FC = () => {
  const plans = [
    { title: 'FREE', description: ['lorem ipsum'], monthlyPrice: 'FREE', yearlyPrice: 'FREE' },
    { title: 'BASIC', description: ['lorem ipsum', 'lorem ipsum'], monthlyPrice: '59DKK', yearlyPrice: '410DKK' },
    { title: 'PREMIUM', description: ['lorem ipsum', 'lorem ipsum', 'lorem ipsum'], monthlyPrice: '99DKK', yearlyPrice: '690DKK' },
  ];

  const [selectedPriceDuration, setSelectedPriceDuration] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('PREMIUM');

  const priceDurationChange = (priceDuration: 'monthly' | 'yearly') => {
    setSelectedPriceDuration(priceDuration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use setSelectedPlan to update the selected plan
    setSelectedPlan(selectedPlan)
    setSelectedPlan(selectedPlan);
    console.log(selectedPlan);
  };

  return (
    <div className={styles.signupplanContainer}>
      <form onSubmit={handleSubmit}>
        <p>Step 2 of 3</p>
        <h2>Choose your plan</h2>

        <div className={styles.pricedurationSwitch}>
          <button
            className={`${styles.pricedurationButton} ${selectedPriceDuration === 'monthly' ? styles.selectedPriceDuration : ''}`}
            onClick={() => priceDurationChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${styles.pricedurationButton} ${selectedPriceDuration === 'yearly' ? styles.selectedPriceDuration : ''}`}
            onClick={() => priceDurationChange('yearly')}
          >
            Yearly 
            <p>30% off</p>
          </button>
        </div>

        {plans.map((plan, index) => (
          <div key={index} className={`${styles.signupplanColumn} ${index === plans.length - 1 ? styles.lastColumn : ''}`}>
            <h3
            className={`${styles.planTitle} ${selectedPlan === plan.title ? styles.selectedPlan : ''}`}
            onClick={() => setSelectedPlan(plan.title)}
            >
            {plan.title}
            </h3>
            <p>{selectedPriceDuration === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}</p>
            <ul>
              {plan.description.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>
                  <span role="img" aria-label="check-mark">
                    ✔
                  </span>{' '}
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Button label={'Next'} />
      </form>
    </div>
  );
};

export default SignUpPlan;
