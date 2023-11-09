import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

/**
 * En este archivo se configura la conexión con firebase.
 * las variables se obtienen del entorno de desarrollo
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Se inicializa la app de firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

