// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import{getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAZWEXXoTBCCa4AKPL3puDXQhoeMuKj-qk",
  authDomain: "resturant-app-4b6ca.firebaseapp.com",
  projectId: "resturant-app-4b6ca",
  storageBucket: "resturant-app-4b6ca.appspot.com",
  messagingSenderId: "943630965390",
  appId: "1:943630965390:web:8d5bf3ab81d16c680807df",
  measurementId: "G-W23JLW88LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//get auth
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};
