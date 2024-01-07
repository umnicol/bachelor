import { FC } from 'react';
import Image from 'next/image';
import styles from './SectionLeft.module.scss';

interface SectionLeftProps {
 imageSrc: string;
 
}
const SectionLeft: FC<SectionLeftProps> = ({ imageSrc}) => {
 return (
    <div className={styles.sectioncontainer}>
      <Image className={styles.sectionimageleft} src={imageSrc} alt="Section image left" width={680} height={430} />
      <h2>EVERYTHING YOU NEED <br></br>
        AT ONE PLACE
      </h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
    </div>
 );
};

export default SectionLeft;