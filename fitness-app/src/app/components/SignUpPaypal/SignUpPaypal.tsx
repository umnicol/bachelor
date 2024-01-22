import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import styles from './SignUpPaypal.module.scss';

interface SignUpPaypalProps {
  onSuccess: () => void;
  selectedPlanDetails: { title: string; price: number; duration: 'monthly' | 'yearly' } | null;
  onChangePlan?: () => void;
}

const SignUpPaypal: React.FC<SignUpPaypalProps> = ({ onSuccess, selectedPlanDetails, onChangePlan }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=ASo734mcAwohiXd6aI1T1aX6980uyt2vYvrBTTRE4KZDGVJGa34l_Tl7ffLGyXZEZXbOkk_JFVxQtnE4&currency=DKK`;
    script.async = true;
    script.onload = () => setIsSdkLoaded(true);
    document.body.appendChild(script);
  
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  

  if (!selectedPlanDetails) {
    return <p className={styles.error}>Error: Selected plan details are missing.</p>;
  }

  const createOrder = (data: any, actions: any) => {
    const orderAmount = selectedPlanDetails.price;

    if (isNaN(orderAmount)) {
      console.error('Invalid order amount for PayPal.');
      return undefined;
    }

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'DKK',
            value: orderAmount.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
    });
  };

  const handlePlanChange = () => {
    if (onChangePlan && typeof onChangePlan === 'function') {
      onChangePlan();
    }
  };

  return (
    <div className={styles.signuppaypalContainer}>
      <h2>Pay with PayPal</h2>
      <PayPalScriptProvider options={{ 'clientId': 'ASo734mcAwohiXd6aI1T1aX6980uyt2vYvrBTTRE4KZDGVJGa34l_Tl7ffLGyXZEZXbOkk_JFVxQtnE4' }}>
        {isSdkLoaded ? (
          <div className={styles.paypalButtonsContainer}>
            <PayPalButtons className={styles.paypalButtons} createOrder={createOrder} onApprove={onApprove} />
          </div>
        ) : (
          <p className={styles.loading}>Loading PayPal SDK...</p>
        )}
      </PayPalScriptProvider>

      {selectedPlanDetails && (
        <div className={styles.planDetailsContainer}>
          <p>
            {selectedPlanDetails.title} <br /> <strong>{selectedPlanDetails.price} DKK</strong>
            <strong>/{selectedPlanDetails.duration}</strong>
          </p>
          <span className={styles.changePlanText} onClick={handlePlanChange}>
            Change
          </span>
        </div>
      )}
    </div>
  );
};

export default SignUpPaypal;
