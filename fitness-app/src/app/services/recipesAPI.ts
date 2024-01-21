import { getFirestore, collection, getDocs, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { firebaseApp } from '../../../firebaseConfig';
import { Recipe } from '../interfaces/recipesInterface';

const firestore = getFirestore(firebaseApp);

export const getRecipesData = async (): Promise<Recipe[]> => {
  try {
    const recipesCollection = collection(firestore, 'recipes');
    const snapshot = await getDocs(recipesCollection) as QuerySnapshot<DocumentData>;

    const recipesData: Recipe[] = snapshot.docs.map((doc) => doc.data() as Recipe);

    return recipesData;
  } catch (error) {
    console.error('Error fetching recipes data:', error);
    return [];
  }
};
