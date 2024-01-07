import { FC } from 'react';
import Image from 'next/image';
import styles from './SectionRight.module.scss';

interface SectionRightProps {
 imageSrc: string;
 
}
const SectionRight: FC<SectionRightProps> = ({ imageSrc}) => {
 return (
    <div className={styles.sectioncontainer}>
      <Image className={styles.sectionimage} src={imageSrc} alt="Section image right" width={730} height={430} />
      <h2>GET TRAINED BY <br></br>
        PROFFESIONAL
      </h2>
      <p>
        You will get access to guides, videos and recipes created by a certified trainer and a world champion in Bikini Fitness. There are no exuses left!
      </p>
    </div>
 );
};

export default SectionRight;