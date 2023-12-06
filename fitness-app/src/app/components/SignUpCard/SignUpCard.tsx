import React, { useState } from 'react';
import styles from './SignUpCard.module.scss';
import Button from '../Button/Button';

interface SignUpCardProps {
  onSubmit?: (formData: CardFormData) => void;
}

interface CardFormData {
  cardNumber: string;
  expiration: string;
  cvv: string;
  nameOnCard: string;
}

const SignUpCard: React.FC<SignUpCardProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('');
  const [cvv, setCVV] = useState<string>('');
  const [nameOnCard, setNameOnCard] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');  // State to store the selected plan

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, stateUpdater: React.Dispatch<React.SetStateAction<string>>) => {
    stateUpdater(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ cardNumber, expiration, cvv, nameOnCard });
    }
  };

  return (
    <div className={styles.signupcardContainer}>
      <form onSubmit={handleSubmit}>
        <p>Step 3 of 3</p>
        <h2>Set up your credit card</h2>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => handleInputChange(e, setCardNumber)}
        />
        <div className={styles.inlineInputs}>
            <input
                type="text"
                placeholder="Expiration Date"
                value={expiration}
                onChange={(e) => handleInputChange(e, setExpiration)}
            />
            <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => handleInputChange(e, setCVV)}
            />
        </div>
        <input
          type="text"
          placeholder="Name on Card"
          value={nameOnCard}
          onChange={(e) => handleInputChange(e, setNameOnCard)}
        />

        <div>
          <p>Chosen Plan: {selectedPlan}</p>
        </div>

        <Button label={'Start Membership'} />
      </form>
    </div>
  );
};

export default SignUpCard;
