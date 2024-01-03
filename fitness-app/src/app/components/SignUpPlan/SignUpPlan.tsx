import React, { useEffect, useMemo, useState } from 'react';
import styles from './SignUpPlan.module.scss';
import Button from '../Button/Button';

interface SignUpPlanProps {
  onNextStep: (selectedPlan: string) => void;
  onSelectPlan: (selectedPlan: string, price: number, duration: 'monthly' | 'yearly') => void;
}

const SignUpPlan: React.FC<SignUpPlanProps> = ({ onNextStep, onSelectPlan }) => {
  const plans = useMemo(() => [
    { title: 'FREE', description: ['lorem ipsum'], monthlyPrice: 0, yearlyPrice: 0 },
    { title: 'BASIC', description: ['lorem ipsum', 'lorem ipsum'], monthlyPrice: 59, yearlyPrice: 410 },
    { title: 'PREMIUM', description: ['lorem ipsum', 'lorem ipsum', 'lorem ipsum'], monthlyPrice: 99, yearlyPrice: 690 },
  ], []);

  const [selectedPriceDuration, setSelectedPriceDuration] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('PREMIUM');

  useEffect(() => {
    const defaultPlan = plans.find((plan) => plan.title === selectedPlan);
    if (defaultPlan) {
      onSelectPlan(selectedPlan, selectedPriceDuration === 'monthly' ? defaultPlan.monthlyPrice : defaultPlan.yearlyPrice, selectedPriceDuration);
    }
  }, [selectedPriceDuration, onSelectPlan, selectedPlan, plans]);
  

  const priceDurationChange = (priceDuration: 'monthly' | 'yearly') => {
    setSelectedPriceDuration(priceDuration);
  };

  return (
    <div className={styles.signupplanContainer}>
      <div>
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
              onClick={() => {
                setSelectedPlan(plan.title);
                onSelectPlan(plan.title, selectedPriceDuration === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice, selectedPriceDuration);
              }}
            >
              {plan.title}
            </h3>
            <p>{selectedPriceDuration === 'monthly' ? `${plan.monthlyPrice} DKK` : `${plan.yearlyPrice} DKK`}</p>            <ul>
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

        <Button label={'Next'} onClick={() => onNextStep(selectedPlan || 'PREMIUM')} />
      </div>
    </div>
  );
};

export default SignUpPlan;
