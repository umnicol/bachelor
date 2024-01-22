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
  //Overall, this code fetches challenge data from a Firestore collection named 'videos' and returns it as an array of Challenge objects. Any errors that occur during this process are logged to the console, and an empty array is returned in such cases.