// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIWjR-whZPfTpHDW-bNzwLv_vm9uoNC0M",
    authDomain: "email-password-auth-b01a2.firebaseapp.com",
    projectId: "email-password-auth-b01a2",
    storageBucket: "email-password-auth-b01a2.appspot.com",
    messagingSenderId: "603971896049",
    appId: "1:603971896049:web:a5502f328eb7f3033c1f50"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

export default app;