import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { firebaseApp } from '../../../firebaseConfig';
import { Recipe } from '../interfaces/recipesInterface';

const firestore = getFirestore(firebaseApp);

export const getRecipesData = async () => {
    try {
      const recipesCollection = collection(firestore, 'recipes');
      const snapshot = await getDocs(recipesCollection);
  
      const recipesData: Recipe[] = [];
  
      snapshot.forEach((doc) => {
        const recipeData = doc.data() as Recipe;
        recipesData.push(recipeData);
      });
  
      return recipesData;
    } catch (error) {
      console.error('Error fetching challenges data:', error);
      return [];
    }
  };