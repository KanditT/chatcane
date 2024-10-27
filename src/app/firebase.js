import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1QBjDxtndnVaey4DnYzs9mRyzHZ-1Dg8",
    authDomain: "chatcane-login.firebaseapp.com",
    projectId: "chatcane-login",
    storageBucket: "chatcane-login.appspot.com",
    messagingSenderId: "847377780832",
    appId: "1:847377780832:web:57750b70e0257b2d29f305"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };