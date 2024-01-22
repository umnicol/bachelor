import React, { useCallback, useEffect, useState } from 'react';
import styles from './SignUpForm.module.scss';
import Button from '../Button/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp, auth } from '../../../../firebaseConfig';
import SignUpPlan from '../SignUpPlan/SignUpPlan';
import SignUpMethod from '../SignUpMethod/SignUpMethod';
import SignUpCard, { CardFormData } from '../SignUpCard/SignUpCard';
import SignUpPaypal from '../SignUpPaypal/SignUpPaypal';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<{ title: string, price: number, duration: 'monthly' | 'yearly' } | null>(null);
  const [paymentComponent, setPaymentComponent] = useState<React.ReactNode | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Credit Card');
   
  const handleNextStep = () => {
    if (currentStep === 2) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 4) {
      setCurrentStep((prevStep) => prevStep - 1);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePlanSelection = (selectedPlan: string, price: number, duration: 'monthly' | 'yearly') => {
    setSelectedPlan(selectedPlan);
    setSelectedPlanDetails({ title: selectedPlan, price, duration });
  };  

  const handleChangePlan = () => {
    setCurrentStep(2);
    setPaymentComponent(null); // Reset the payment component when changing the plan
  };

  const handlePayPalSuccess = useCallback(async () => {
      try {
      console.log('Handling PayPal success...');
  
      if (!email || !password || !selectedPlanDetails) {
        setError('Please provide all necessary information.');
        console.error('Error: Please provide all necessary information.');
        return;
      }
  
      if (!selectedPlan) {
        setError('Please select a subscription plan.');
        console.error('Error: Please select a subscription plan.');
        return;
      }
  
      const auth = getAuth(firebaseApp);
  
      try {
        setError(null);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        const firestore = getFirestore(firebaseApp);
        const usersCollection = collection(firestore, 'users');

        await addDoc(usersCollection, {
          email: user?.email,
          subscriptions: {
            title: selectedPlanDetails.title,
            price: selectedPlanDetails.price,
            duration: selectedPlanDetails.duration,
          },
        });

        window.location.href = '/signin';
      } catch (error) {
        console.error('Error during user creation:', error);
      }
    } catch (error) {
      console.error('Error handling PayPal success:', error);
    }
  }, [email, password, selectedPlan, selectedPlanDetails]);

  const handleCardSubmit = useCallback(
    async (formData: CardFormData) => {
      try {
        console.log('Selected Payment Method:', selectedPaymentMethod);
        console.log('Starting handleCardSubmit');
  
        if (!email || !password || !selectedPlanDetails) {
          setError('Please provide all necessary information.');
          console.error('Error: Please provide all necessary information.');
          return;
        }

        if (!selectedPlan) {
          setError('Please select a subscription plan.');
          console.error('Error: Please select a subscription plan.');
          return;
        }
  
        const auth = getAuth(firebaseApp);
  
        try {
          setError(null);
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
  
          const firestore = getFirestore(firebaseApp);
          const usersCollection = collection(firestore, 'users');
          await addDoc(usersCollection, {
            email: user?.email,
            subscriptions: {
              title: selectedPlanDetails.title,
              price: selectedPlanDetails.price,
              duration: selectedPlanDetails.duration,
            },
          });
  
          setCurrentStep((prevStep) => prevStep + 1);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
  
          switch (errorCode) {
            case 'auth/invalid-email':
              setError('Invalid email address');
              console.error('Error: Invalid email address');
              break;
            case 'auth/weak-password':
              setError('Weak password. Please use a stronger password.');
              console.error('Error: Weak password. Please use a stronger password.');
              break;
            case 'auth/email-already-in-use':
              setError('The email address is already in use. Please use a different email.');
              console.error('Error: The email address is already in use. Please use a different email.');
              break;
            default:
              setError('An error occurred while signing up. Please try again later.');
              console.error('Error signing up:', errorCode, errorMessage);
          }
        }
      } catch (error) {
        console.error('Error handling submit:', error);
      }
    },
    [email, password, selectedPaymentMethod, selectedPlan, selectedPlanDetails]
  );
  
  
  useEffect(() => {
    let newPaymentComponent: React.ReactNode | null = null;
  
    switch (selectedPaymentMethod) {
      case 'Credit Card':
        newPaymentComponent = <SignUpCard onSubmit={handleCardSubmit} selectedPlanDetails={selectedPlanDetails} onChangePlan={handleChangePlan} />;
        break;
      case 'PayPal':
        newPaymentComponent = <SignUpPaypal onSuccess={handlePayPalSuccess} selectedPlanDetails={selectedPlanDetails} onChangePlan={handleChangePlan} />;
        break;
      default:
        break;
    }
  
    setPaymentComponent(newPaymentComponent);
  }, [selectedPaymentMethod, selectedPlanDetails, handleCardSubmit, handlePayPalSuccess]); 

  return (
    <div className={styles.signupformContainer}>
      {currentStep === 1 && (
        <form>
          <p>Step 1 of 2</p>
          <h2>Create a password to start your membership!</h2>
          <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p>{error}</p>}
          <Button type="button" label={'Next'} onClick={handleNextStep} />        </form>
      )}

      {currentStep === 2 && <SignUpPlan onNextStep={handleNextStep} onSelectPlan={handlePlanSelection} />}
      {currentStep === 3 && <SignUpMethod onNextStep={handleNextStep} setSelectedPaymentMethod={setSelectedPaymentMethod} />}
      {currentStep === 4 && paymentComponent && (
        <>
          {paymentComponent}
        </>
      )}
    </div>
  );
};

export default SignUpForm;
