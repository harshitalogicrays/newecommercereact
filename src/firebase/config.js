// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyBAPewhSOVn6olIFVD9n24CYUtJ5Pb5bDc",
//   authDomain: "ecommerce-reactreduxfirebase.firebaseapp.com",
//   projectId: "ecommerce-reactreduxfirebase",
//   storageBucket: "ecommerce-reactreduxfirebase.appspot.com",
//   messagingSenderId: "118664943622",
//   appId: "1:118664943622:web:0157b0eb672850a5398b87"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBAPewhSOVn6olIFVD9n24CYUtJ5Pb5bDc",
  authDomain: "ecommerce-reactreduxfirebase.firebaseapp.com",
  projectId: "ecommerce-reactreduxfirebase",
  storageBucket: "ecommerce-reactreduxfirebase.appspot.com",
  messagingSenderId: "118664943622",
  appId: "1:118664943622:web:0157b0eb672850a5398b87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app)
export default app