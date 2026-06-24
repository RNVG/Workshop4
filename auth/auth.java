// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbUVDD0Uy8lG8pMPGEKnmdBZcSvusHmHA",
  authDomain: "nuxt-firebase-workshop-14ca1.firebaseapp.com",
  projectId: "nuxt-firebase-workshop-14ca1",
  storageBucket: "nuxt-firebase-workshop-14ca1.firebasestorage.app",
  messagingSenderId: "327167340855",
  appId: "1:327167340855:web:ff19f86b04980f76792ab2",
  measurementId: "G-B596CDHPGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
