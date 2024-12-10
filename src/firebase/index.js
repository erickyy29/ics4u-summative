import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyAV_oAJMNdPXmPKvhgrMxh7eDBHNh7z4Xg",
    authDomain: "summative-91626.firebaseapp.com",
    projectId: "summative-91626",
    storageBucket: "summative-91626.firebasestorage.app",
    messagingSenderId: "865169770644",
    appId: "1:865169770644:web:bd6d77f9c6ddf8431dcc81"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };