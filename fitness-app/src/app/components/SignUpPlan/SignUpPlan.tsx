import React, { useEffect, useMemo, useState } from 'react';
import styles from './SignUpPlan.module.scss';
import Button from '../Button/Button';
import { PricingPlan, pricingPlans } from '@/app/interfaces/pricingPlansInterface';

interface SignUpPlanProps {
  onNextStep: (selectedPlan: string) => void;
  onSelectPlan: (selectedPlan: string, price: number, duration: 'monthly' | 'yearly') => void;
}

const SignUpPlan: React.FC<SignUpPlanProps> = ({ onNextStep, onSelectPlan }) => {
  const [selectedPriceDuration, setSelectedPriceDuration] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('PREMIUM');

  useEffect(() => {
    const defaultPlan = pricingPlans.find((plan) => plan.name === selectedPlan);
    if (defaultPlan) {
      onSelectPlan(selectedPlan, selectedPriceDuration === 'monthly' ? defaultPlan.monthlyPrice : defaultPlan.yearlyPrice, selectedPriceDuration);
    }
  }, [selectedPriceDuration, onSelectPlan, selectedPlan]);

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

        {pricingPlans.map((plan, index) => (
          <div key={index} className={`${styles.signupplanColumn} ${index === pricingPlans.length - 1 ? styles.lastColumn : ''}`}>
            <h3
              className={`${styles.planTitle} ${selectedPlan === plan.name ? styles.selectedPlan : ''}`}
              onClick={() => {
                setSelectedPlan(plan.name);
                onSelectPlan(plan.name, selectedPriceDuration === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice, selectedPriceDuration);
              }}
            >
              {plan.name}
            </h3>
            <p>{selectedPriceDuration === 'monthly' ? `${plan.monthlyPrice} DKK` : `${plan.yearlyPrice} DKK`}</p>            
            <ul>
              {plan.features.map((bullet, bulletIndex) => (
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
