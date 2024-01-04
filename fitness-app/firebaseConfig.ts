import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJjkAa_jvQMLo8U1YfVuKNJ_Fnq5eVC6c",
  authDomain: "laurafit-3d0b4.firebaseapp.com",
  projectId: "laurafit-3d0b4",
  storageBucket: "laurafit-3d0b4.appspot.com",
  messagingSenderId: "631008272349",
  appId: "1:631008272349:web:92d093baf2d47ce77de034"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };