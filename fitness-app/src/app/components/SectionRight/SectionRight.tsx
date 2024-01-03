import { FC } from 'react';
import Image from 'next/image';
import styles from './SectionRight.module.scss';

interface SectionRightProps {
 imageSrc: string;
 
}
const SectionRight: FC<SectionRightProps> = ({ imageSrc}) => {
 return (
    <div className={styles.sectioncontainer}>
      <Image className={styles.sectionimage} src={imageSrc} alt="Section image right" width={1080} height={320} />
      <h2>SUBSCRIPTION YOUR BODY
        WILL THANK YOU FOR
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
    </div>
 );
};

export default SectionRight;