import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAC_6W18pFdQaIr2QAd66csBb0InvPr2g",
  authDomain: "bikesite-65e12.firebaseapp.com",
  projectId: "bikesite-65e12",
  storageBucket: "bikesite-65e12.appspot.com",
  messagingSenderId: "663382097577",
  appId: "1:663382097577:web:ceb4c4b25d1a946029f3b8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
