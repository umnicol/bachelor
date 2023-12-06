import React, { useState } from 'react';
import styles from './SignUpMethod.module.scss';
import Button from '../Button/Button';

const SignUpMethod: React.FC = () => {
    const paymentMethods = [
        { name: 'Credit Card', image: 'img-credit-card.png' },
        { name: 'MobilePay', image: 'img-mobilepay.png' },
        { name: 'PayPal', image: 'img-paypal.png' },
      ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Credit Card');

  const paymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform authentication logic
  };

  return (
    <div className={styles.signupmethodContainer}>
      <form onSubmit={handleSubmit}>
        <p>Step 3 of 3</p>
        <h2>Choose a method of payment</h2>

        <div className={styles.paymentMethods}>
          {paymentMethods.map((method, index) => (
            <button
              key={index}
              className={`${styles.paymentMethodButton} ${selectedPaymentMethod === method.name ? styles.selectedPaymentMethod : ''}`}
              onClick={() => paymentMethodChange(method.name)}
            >
              <img src={method.image} alt={method.name} width={20} height={20}/> {method.name}
            </button>
          ))}
        </div>

        <Button label={'Next'} />
      </form>
    </div>
  );
};

export default SignUpMethod;
