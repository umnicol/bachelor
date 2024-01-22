// PricingPlan.tsx

import React, { useState } from 'react';
import styles from './PricingPlan.module.scss';
import Link from 'next/link';
import { PricingPlan, pricingPlans } from '@/app/interfaces/pricingPlansInterface';

const PricingPlanComponent: React.FC = () => {
  const [selectedPriceDuration, setSelectedPriceDuration] = useState<'monthly' | 'yearly'>('monthly');

  const togglePriceDuration = (priceDuration: 'monthly' | 'yearly') => {
    setSelectedPriceDuration(priceDuration);
  };

  return (
    <div className={styles.pricingtitle}>
      <h2>EFFECTIVE YET AFFORDABLE</h2>
      <p>Choose the plan that suits your needs the best</p>

      <div className={styles.pricedurationSwitch}>
        <button
          className={`${styles.pricedurationButton} ${selectedPriceDuration === 'monthly' ? styles.selectedPriceDuration : ''}`}
          onClick={() => togglePriceDuration('monthly')}
        >
          Monthly
        </button>
        <button
          className={`${styles.pricedurationButton} ${selectedPriceDuration === 'yearly' ? styles.selectedPriceDuration : ''}`}
          onClick={() => togglePriceDuration('yearly')}
        >
          Yearly
          <p>30% off</p>
        </button>
      </div>

      <div className={styles.pricingplans}>
        {pricingPlans.map((plan, index) => (
          <div key={index} className={styles.pricingplan}>
            <h2>{plan.name}</h2>
            <p>{selectedPriceDuration === 'monthly' ? `${plan.monthlyPrice} DKK / month` : `${plan.yearlyPrice} DKK / year`}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <Link href="/signin">
              <button>JOIN NOW</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlanComponent;
