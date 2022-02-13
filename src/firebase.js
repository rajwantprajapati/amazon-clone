// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_LDA-sWAiKkNbtrgW83ljVkL7ft-0NqU",
  authDomain: "clone-e6a4b.firebaseapp.com",
  projectId: "clone-e6a4b",
  storageBucket: "clone-e6a4b.appspot.com",
  messagingSenderId: "781587948931",
  appId: "1:781587948931:web:8e79737ae066eb060842b6",
  measurementId: "G-GWZE5JSLG8"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth };
export default db;