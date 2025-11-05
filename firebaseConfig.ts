// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzMejsUq7ZrhDSKJPQzhOWmnR07Le1z-U",
  authDomain: "habit-tracker-51fea.firebaseapp.com",
  projectId: "habit-tracker-51fea",
  storageBucket: "habit-tracker-51fea.firebasestorage.app",
  messagingSenderId: "95836384393",
  appId: "1:95836384393:web:ee8fc29ddc9593eada6a58",
  measurementId: "G-GNW3HLJEQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database) - export this
export const db = getFirestore(app);

// Initialize Authentication - export this
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;