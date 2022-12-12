import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBZDhDKvzHPcd3UIaZSTMCOy2DPr7fQ2KE",
    authDomain: "test-teacher-80946.firebaseapp.com",
    projectId: "test-teacher-80946",
    storageBucket: "test-teacher-80946.appspot.com",
    messagingSenderId: "849962011988",
    appId: "1:849962011988:web:6d87b41ad0a789447b8cc1"
  };  

const app = initializeApp(firebaseConfig)
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export { db }