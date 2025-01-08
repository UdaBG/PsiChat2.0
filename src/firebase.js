// Import the Firebase libraries
import firebase from "firebase/app";
import "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBThaaDf3Xw9VPxfw_n1_xDBW7_bd-g8Vo",
    authDomain: "psichat-2.firebaseapp.com",
    projectId: "psichat-2",
    storageBucket: "psichat-2.firebasestorage.app",
    messagingSenderId: "415493459871",
    appId: "1:415493459871:web:d121343d8fd0d3e126b7aa",
    measurementId: "G-BZR5QTB6TM",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Export Firestore database
export const db = app.firestore();
