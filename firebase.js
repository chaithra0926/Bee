// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkFy46fbnzriKT2eLsd3aK1jrpZgkdkUA",
    authDomain: "arrow-89926.firebaseapp.com",
    projectId: "arrow-89926",
    storageBucket: "arrow-89926.firebasestorage.app",
    messagingSenderId: "422035987206",
    appId: "1:422035987206:web:6f2363aa0335872ba91c87",
    measurementId: "G-0YZ2M7L1C9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth so auth.js can use it
export const auth = getAuth(app);
