import React, { useEffect, useMemo, useState } from 'react';
import styles from './SignUpPlan.module.scss';
import Button from '../Button/Button';

interface SignUpPlanProps {
  onNextStep: (selectedPlan: string) => void;
  onSelectPlan: (selectedPlan: string, price: number, duration: 'monthly' | 'yearly') => void;
}

const SignUpPlan: React.FC<SignUpPlanProps> = ({ onNextStep, onSelectPlan }) => {
  const plans = useMemo(() => [
    { title: 'BASIC', description: ['10 guides', 'Limited recipes', 'No check-ins'], monthlyPrice: 59, yearlyPrice: 410 },
    { title: 'PRO', description: ['20 guides', 'All recipes', 'Check-ins'], monthlyPrice: 99, yearlyPrice: 690 },
    { title: 'PREMIUM', description: ['All guides', 'Free meal plan', 'Check-ins'], monthlyPrice: 120, yearlyPrice: 1008 },

  ], []);
//Defines an array of subscription plans using the useMemo hook to memoize the plans.
  const [selectedPriceDuration, setSelectedPriceDuration] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('PREMIUM');
//Represents whether the user has selected a monthly or yearly payment duration. It is initially set to 'monthly'.
//Represents the currently selected subscription plan. It is initially set to 'PREMIUM'.

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
            <p>{selectedPriceDuration === 'monthly' ? `${plan.monthlyPrice} DKK` : `${plan.yearlyPrice} DKK`}</p>            
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

        <Button label={'Next'} onClick={() => onNextStep(selectedPlan || 'PREMIUM')} />
      </div>
    </div>
  );
};

export default SignUpPlan;
