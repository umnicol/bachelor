import Link from 'next/link';
import React from 'react';
import styles from './PricingPlan.module.scss';

interface PricingPlans {
  name: string;
  price: number;
  features: string[];
}

const PricingPlan: React.FC = () => {
  const plans: PricingPlans[] = [
    {
      name: 'BASIC PLAN',
      price: 10.99,
      features: ['10 available quides', 'Limited recipes', 'No check-ins'],
    },
    {
      name: 'PRO PLAN',
      price: 19.99,
      features: ['20 available guides', 'Full access to recipes', 'Check-ins available'],
    },
    {
      name: 'PREMIUM PLAN',
      price: 29.99,
      features: ['All guides available', 'Free meal plan', 'Check-ins available'],
    },
  ];

  return (
   <div className={styles.pricingtitle}>
    <h2>EFFECTIVE YET AFFORDABLE</h2> 
    <p>Choose the plan that suites your needs the best</p>
    <div className={styles.pricingplans}>
      {plans.map((plan, index) => (
        <div key={index} className={styles.pricingplan}>
          <h2>{plan.name}</h2>
          <p>${plan.price} / month</p>
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

export default PricingPlan;
