import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { firebaseApp } from '../../../firebaseConfig';
import { Challenge } from '../interfaces/challengeInterface';

const firestore = getFirestore(firebaseApp);

export const getChallengesData = async () => {
    try {
      const challengesCollection = collection(firestore, 'videos');
      const snapshot = await getDocs(challengesCollection);
  
      const challengesData: Challenge[] = [];
  
      snapshot.forEach((doc) => {
        const challengeData = doc.data() as Challenge;
        challengesData.push(challengeData);
      });
  
      return challengesData;
    } catch (error) {
      console.error('Error fetching challenges data:', error);
      return [];
    }
  };