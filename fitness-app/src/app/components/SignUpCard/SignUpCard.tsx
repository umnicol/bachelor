import React, { useState } from 'react';
import styles from './SignUpCard.module.scss';
import Button from '../Button/Button';
import { firebaseApp, auth }from '../../../../firebaseConfig';
import { getCheckoutUrl } from '@/app/stripePayment';

interface SignUpCardProps {
  onSubmit?: (formData: CardFormData) => void;
  selectedPlanDetails: { title: string, price: number, duration: 'monthly' | 'yearly' } | null;
  onComplete?: () => void;
  onChangePlan?: () => void; 
}

export interface CardFormData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const SignUpCard: React.FC<SignUpCardProps> = ({ onSubmit, selectedPlanDetails, onComplete, onChangePlan }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'expiryDate':
        setExpiryDate(value);
        break;
      case 'cvc':
        setCvc(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      onSubmit && onSubmit({
        cardNumber,
        expiryDate,
        cvc,
      });

      onComplete && onComplete();

      // Assuming you've set up and configured the Firebase extension for Stripe Checkout
      // Use the getCheckoutUrl function from your stripePayment module
      const checkoutUrl = await getCheckoutUrl(
        firebaseApp,
        selectedPlanDetails?.title || 'FREE',
        selectedPlanDetails?.duration || 'monthly',
        {
          name: '',
          number: cardNumber,
          expMonth: parseInt(expiryDate.split('/')[0], 10),
          expYear: parseInt(expiryDate.split('/')[1], 10),
          cvc,
        }
      );

      console.log(checkoutUrl);

      // ... rest of your code
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  return (
    <div className={styles.signupcardContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={expiryDate}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={handleInputChange}
        />

        <Button label={'Start Membership'} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default SignUpCard;
