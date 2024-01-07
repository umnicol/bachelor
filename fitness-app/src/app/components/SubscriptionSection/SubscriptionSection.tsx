import React, { FC } from 'react';
import Image from 'next/image';
import styles from './SubscriptionSection.module.scss';

interface SubscriptionSectionProps {
  imageSrc: string;
  
 }
 const SubscriptionSection: FC<SubscriptionSectionProps> = ({ imageSrc}) => {
  return (
    <div className={styles.subscriptionsection}>
      <Image className={styles.subscriptionimage} src={imageSrc} alt="Subscription image" width={480} height={440} />
      <h2>SUBSCRIPTION YOUR BODY <br></br>
        WILL THANK YOU FOR
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
    </div>
 );
};

export default SubscriptionSection;