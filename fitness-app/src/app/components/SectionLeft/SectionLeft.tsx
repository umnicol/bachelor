import { FC } from 'react';
import Image from 'next/image';
import styles from './SectionLeft.module.scss';

interface SectionLeftProps {
 imageSrc: string;
 
}
const SectionLeft: FC<SectionLeftProps> = ({ imageSrc}) => {
 return (
    <div className={styles.sectioncontainer}>
      <Image className={styles.sectionimageleft} src={imageSrc} alt="Section image left" width={650} height={420} />
      <h2>EVERYTHING YOU NEED <br></br>
        AT ONE PLACE
      </h2>
      <p>
        Are you busy and want to fit in a quick workout? Or do you need inspiration for your lunch or dinner? We have everyrhing and even more. Try it out!
      </p>
    </div>
 );
};

export default SectionLeft;