import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export const getCheckoutUrl = async (
  app: FirebaseApp,
  selectedPlan: string,
  selectedDuration: string,
  cardDetails: {
    name: string;
    number: string;
    expMonth: number;
    expYear: number;
    cvc: string;
  }
): Promise<string> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(db, "users", userId, "checkout_sessions");

  let priceId: string;

  if (selectedPlan === "BASIC") {
    priceId =
      selectedDuration === "monthly"
        ? "price_1OQ4q8JcjxIvHdVu7GJzOtHa"
        : "price_1OQ4q8JcjxIvHdVuI2wtuuLb";
  } else if (selectedPlan === "PREMIUM") {
    priceId =
      selectedDuration === "monthly"
        ? "price_1OQ4pMJcjxIvHdVuiMQT9Yd6"
        : "price_1OQ4pMJcjxIvHdVuDeQzu65Q";
  } else {
    throw new Error("Invalid selected plan");
  }

  const docRef = await addDoc(checkoutSessionRef, {
    plan: selectedPlan,
    duration: selectedDuration,
    priceId: priceId,
    cardDetails: {
      name: cardDetails.name,
      number: cardDetails.number,
      expMonth: cardDetails.expMonth,
      expYear: cardDetails.expYear,
      cvc: cardDetails.cvc,
    },
    // Add any other relevant data for your checkout session
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occurred: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL:", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  let dataWithUrl: any;
  try {
    const functions = getFunctions(app, "us-central1");
    const functionRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
          );
    const { data } = await functionRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });

    // Add a type to the data
    dataWithUrl = data as { url: string };
    console.log("Reroute to Stripe portal: ", dataWithUrl.url);
  } catch (error) {
    console.error(error);
  }

  return new Promise<string>((resolve, reject) => {
    if (dataWithUrl.url) {
      resolve(dataWithUrl.url);
    } else {
      reject(new Error("No url returned"));
    }
  });
};
