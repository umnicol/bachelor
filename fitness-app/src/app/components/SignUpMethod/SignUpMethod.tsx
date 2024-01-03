// SignUpMethod.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './SignUpMethod.module.scss';
import Button from '../Button/Button';
import Image from 'next/image';

interface SignUpMethodProps {
  onNextStep: () => void;
  setSelectedPaymentMethod: Dispatch<SetStateAction<string>>;
}

const SignUpMethod: React.FC<SignUpMethodProps> = ({ onNextStep, setSelectedPaymentMethod }) => {
  const paymentMethods = [
    { name: 'Credit Card', image: '/img-credit-card.png' },
    { name: 'MobilePay', image: '/img-mobilepay.png' },
    { name: 'PayPal', image: '/img-paypal.png' },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethodLocal] = useState<string>('Credit Card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected Payment Method:', selectedPaymentMethod);
    // Notify the parent component about the selected payment method
    setSelectedPaymentMethod(selectedPaymentMethod);
  

    // Proceed to the next step
    onNextStep();
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
              onClick={() => setSelectedPaymentMethodLocal(method.name)}
            >
              <Image src={method.image} alt={method.name} width={15} height={15}/> {method.name}
            </button>
          ))}
        </div>

        <Button label={'Next'} type="submit" />
      </form>
    </div>
  );
};

export default SignUpMethod;
