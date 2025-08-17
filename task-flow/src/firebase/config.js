// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB2Q2TCL45GKTyHJjqeXyaaytU91JaqQBE',
    authDomain: 'taskflow-app-28b78.firebaseapp.com',
    projectId: 'taskflow-app-28b78',
    storageBucket: 'taskflow-app-28b78.firebasestorage.app',
    messagingSenderId: '693275204267',
    appId: '1:693275204267:web:9c0207f1508dc835e3b5ee',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
