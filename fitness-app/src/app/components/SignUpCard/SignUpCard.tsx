import React, { useState } from 'react';
import styles from './SignUpCard.module.scss';
import Button from '../Button/Button';
import { firebaseApp, auth } from '../../../../firebaseConfig';
import { getCheckoutUrl } from '@/app/stripePayment';

interface SignUpCardProps {
  onSubmit?: (formData: CardFormData) => void; //void means it does not have any return value
  selectedPlanDetails: { title: string; price: number; duration: 'monthly' | 'yearly' } | null;
  onComplete?: () => void;
  onChangePlan?: () => void;
}

export interface CardFormData {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const SignUpCard: React.FC<SignUpCardProps> = ({ onSubmit, selectedPlanDetails, onComplete, onChangePlan }) => {
  const [name, setName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) { //it is a statment that handles different input fields based on their name attributes 
      case 'name': //used to define different branches of code based on the value expression
        setName(value); //depending on the input fields it updates the variable to the new value
        break; //used to ecit the switch statment after the code in case is executed
      case 'cardNumber':
        setCardNumber(value);
        break;
      case 'expiryDate':
        const cleanedValue = value.replace(/\D/g, '');
        // Format as MM/YY
        const formattedValue =
          cleanedValue.length >= 2 ? `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}` : cleanedValue;

        setExpiryDate(formattedValue);
        break;
      case 'cvc':
        setCvc(value.replace(/\D/g, '').slice(0, 3));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      onSubmit && //checks of onSubmit prop exists and if it is true it is invoked with an object containig form data
        onSubmit({
          name,
          cardNumber,
          expiryDate,
          cvc,
        });

      onComplete && onComplete();

      const checkoutUrl = await getCheckoutUrl(
        firebaseApp,
        selectedPlanDetails?.title || 'PREMIUM',
        selectedPlanDetails?.duration || 'monthly',
        {
          name,
          number: cardNumber,
          expMonth: parseInt(expiryDate.split('/')[0], 10),
          expYear: parseInt(expiryDate.split('/')[1], 10),
          cvc,
        }
      );

      console.log(checkoutUrl);
      window.location.href = '/mainpage';
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  //represents the asynchronous handling of a form submission. It calls a function (getCheckoutUrl) to obtain a checkout URL for payment processing, logs the URL to the console, redirects the user to '/mainpage' upon success, and handles any errors that may occur during the process by logging them to the console

  return (
    <div className={styles.signupcardContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name on Card"
          value={name}
          onChange={handleInputChange}
        />

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
